import React from 'react'
import { Query } from 'react-apollo'
import { department } from '@gqlQueries'
import { Spin, Icon, Popover, Button, Checkbox, Tooltip, Tag } from 'antd'

const { Group: CheckboxGroup } = Checkbox

const DepartmentSelection = (props) => {
  const { onChange } = props

  return(
    <div style={{minWidth: 120, minHeight: 120, textAlign: 'center'}} >
      <Query
        query={department.GET_EVENT_DEPARTMENTS}
      >
        {({data, loading}) => {
          if(loading){
            return <Spin indicator={<Icon type='loading' style={{ fontSize: 24 }} spin />} />
          }
          const options = data.eventDepartments.map(item => ({ label: item.name, value: item.id }))
          return(
            <CheckboxGroup options={options} onChange={onChange} />
          )
        }}
      </Query>
    </div>
  )
}

class Wrapper extends React.Component{

  state = {
    selected: []
  }

  handleChange = (values) => {
    const { onChange } = this.props
    onChange && onChange(values)
    this.setState({ selected: values })
  }

  render() {
    const { updateStage } = this.props
    
    return (
      <Popover 
        style={{paddingTop: 50}} 
        content={<DepartmentSelection onChange={this.handleChange} />} 
        title='Danh sách Khoa'
        placement='topLeft'
        trigger={updateStage ? 'click' : 'hover'}
      >
        <div style={{display: 'flex'}} >
          <div style={{marginRight: 18}} >
            <Tooltip 
              title={updateStage ? 'Không thể chọn lại khoa sau khi đã tạo sự kiện' : ''}
            >
              <Button type='dashed' disabled={updateStage} >Chọn khoa</Button>
            </Tooltip>
          </div>
          <div>
            {this.state.selected.map(item => <Tag color='blue' key={item} >{item}</Tag>)}
          </div>
        </div>
      </Popover>
    )
  }
}

export default Wrapper