import React from 'react'
import { Query } from 'react-apollo'
import { department } from '@gqlQueries'
import { Spin, Icon, Popover, Button, Checkbox, Tooltip, Tag } from 'antd'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

const { Group: CheckboxGroup } = Checkbox

const DepartmentSelection = (props) => {
  const { onChange } = props

  return (
    <div style={{ width: 200, minHeight: 120 }}>
      <Query query={department.GET_EVENT_DEPARTMENTS}>
        {({ data, loading }) => {
          if (loading) {
            return <Spin indicator={<Icon type='loading' style={{ fontSize: 24 }} spin />} />
          }
          const options = data.eventDepartments.map((item) => ({
            label: item.name,
            value: JSON.stringify({ id: item.id, name: item.name })
          }))
          return <CheckboxGroup options={options} onChange={onChange} />
        }}
      </Query>
    </div>
  )
}

@inject('stores')
@observer
class Wrapper extends React.Component {
  state = {
    selected: []
  }

  handleChange = (values) => {
    const dataParsed = values.map((item) => JSON.parse(item))
    const ids = dataParsed.map((item) => item.id)
    const names = dataParsed.map((item) => item.name)
    const { onChange } = this.props
    onChange && onChange(ids)
    this.setState({ selected: names })
  }

  render() {
    const { updateStage } = this.props
    const { event } = this.props.stores.event

    return (
      <Popover
        style={{ paddingTop: 50 }}
        content={<DepartmentSelection onChange={this.handleChange} />}
        title='Danh sách Khoa'
        placement='topLeft'
        trigger={updateStage ? 'click' : 'hover'}
        overlayClassName='deaprtment-selection-custom__wrapper'
      >
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 18 }}>
            <Tooltip title={updateStage ? 'Không thể chọn lại khoa sau khi đã tạo sự kiện' : ''}>
              <Button type='dashed' disabled={updateStage}>
                Chọn khoa
              </Button>
            </Tooltip>
          </div>
          <div>
            {this.state.selected.map((item) => (
              <Tag color='blue' key={item}>
                {item}
              </Tag>
            ))}
            {updateStage &&
              event &&
              toJS(event.departments).map((item) => (
                <Tag color='blue' key={item.id}>
                  {item.name}
                </Tag>
              ))}
          </div>
        </div>
      </Popover>
    )
  }
}

export default Wrapper
