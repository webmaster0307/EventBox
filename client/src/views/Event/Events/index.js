import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom'
import { Table, Icon } from 'antd'

import Loading from '@components/Loading';

const EVENT_CREATED = gql`
  subscription {
    eventCreated {
      event {
        id
        title
        description
        images {
          thumbnail
        }
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

const GET_PAGINATED_EVENTS_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    events(cursor: $cursor, limit: $limit)
      @connection(key: "EventConnection") {
      edges {
        id
        title
        description
        images {
          thumbnail
        }
        createdAt
        user {
          id
          username
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const limit = 10
const Events = () => (
  <Query
    query={GET_PAGINATED_EVENTS_WITH_USERS}
    variables={{ limit }}
  >
    {({ data, loading, error, fetchMore, subscribeToMore }) => {
      if (!data) {
        return (
          <div>
            There are no events yet ... Try to create one by
            yourself.
          </div>
        );
      }

      const { events } = data;

      if (loading || !events) {
        return <Loading />;
      }

      const { edges, pageInfo } = events;

      return (
        <Fragment>
          <EventList
            events={edges}
            subscribeToMore={subscribeToMore}
          />

          {pageInfo.hasNextPage && (
            <MoreEventsButton
              limit={limit}
              pageInfo={pageInfo}
              fetchMore={fetchMore}
            >
              More
            </MoreEventsButton>
          )}
        </Fragment>
      );
    }}
  </Query>
);

const MoreEventsButton = ({
  limit,
  pageInfo,
  fetchMore,
  children,
}) => (
  <button
    type="button"
    onClick={() =>
      fetchMore({
        variables: {
          cursor: pageInfo.endCursor,
          limit,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          return {
            events: {
              ...fetchMoreResult.events,
              edges: [
                ...previousResult.events.edges,
                ...fetchMoreResult.events.edges,
              ],
            },
          };
        },
      })
    }
  >
    {children}
  </button>
);

class EventList extends Component {
  subscribeToMoreEvent = () => {
    this.props.subscribeToMore({
      document: EVENT_CREATED,
      updateQuery: (previousResult, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previousResult;
        }

        const { eventCreated } = subscriptionData.data;

        return {
          ...previousResult,
          events: {
            ...previousResult.events,
            edges: [
              eventCreated.event,
              ...previousResult.events.edges,
            ],
          },
        };
      },
    });
  };

  componentDidMount() {
    this.subscribeToMoreEvent();
  }

  tableColumns = () => [
    {
      title: '',
      dataIndex: 'images',
      render: (images, record) => <div><img src={images.thumbnail} style={{maxWidth: 42}} alt='thumbnail' /></div>
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text, record) => <Link to={`/events/detail/${record.id}`} >{text}</Link>
    },
    {
      title: '',
      dataIndex: 'id',
      render: (id) => <Link to={`/events/update/${id}`} ><Icon type='edit' /> Edit</Link>
    },
    {
      title: 'Owner',
      dataIndex: 'user',
      render: (text, record) => <div>{record.user.username}</div>
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      render: (text, record) => <div>{new Date(Number(record.createdAt)).toLocaleString()}</div>
    }
  ]

  render() {
    const { events } = this.props;
    return(
      // <Query query={getSession} >
      //   {({ data }) => {
      //     const { me } = data
      //     return(
      //       events.map(event => (
      //         <EventItem key={event.id} event={event} me={me} />
      //       ))
      //     )
      //   }}
      // </Query>
      <Table dataSource={events} columns={this.tableColumns()} rowKey='id' />
    )
  }
}

export default Events;