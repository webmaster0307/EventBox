import React from 'react'
import { List, Skeleton } from 'antd'

const fakeData = Array(2)
  .fill(0)
  .map((item, index) => index)

export default () => (
  <List
    itemLayout='horizontal'
    dataSource={fakeData}
    renderItem={(item: any) => (
      <List.Item key={item}>
        <div style={{ width: '50%' }}>
          <Skeleton loading active avatar paragraph={{ rows: 1 }} />
        </div>
      </List.Item>
    )}
  />
)
