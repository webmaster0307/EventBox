import React from 'react'
import { Query } from 'react-apollo'
import { department } from '@gqlQueries'
import { Spin, Icon, Popover, Button, Checkbox } from 'antd'

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

  handleChange = values => {
    const { onChange } = this.props
    onChange && onChange(values)
  }

  render() {
    
    return (
      <Popover 
        style={{paddingTop: 50}} 
        content={<DepartmentSelection onChange={this.handleChange} />} 
        title='Danh sách Khoa'
        placement='topLeft'
      >
        <Button type='dashed' >Chọn khoa</Button>
      </Popover>
    )
  }
}

export default Wrapper