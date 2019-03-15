import React from 'react'
import { Row, Col, Divider } from 'antd'
import { AvatarPicker, ReadonlyFields } from './components'
import { Query } from 'react-apollo'
import { session } from '@gqlQueries'
import FormUserInfo from './components/FormUserInfo'

const Profile = () => (
  <Query query={session.GET_LOCAL_SESSION}>
    {({ data }) => (
      <div>
        {data.me && (
          <Row gutter={20}>
            <Col xs={24} sm={24} md={12} lg={9}>
              <AvatarPicker avatar={data.me && data.me.photo} />
              <Divider />
              <ReadonlyFields data={data.me} />
              <Divider />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div
                style={{
                  borderRadius: 10,
                  background: 'rgba(214, 229, 255, 0.4)',
                  padding: 20
                }}
              >
                <FormUserInfo data={data.me} />
              </div>
              <Divider />
            </Col>
          </Row>
        )}
      </div>
    )}
  </Query>
)

export default Profile
