import React from 'react'

import * as routes from '../../constants/routes'

export const languageConfig = {
  English: {
    navigationItems: [
      { path: routes.SIGN_UP, text: 'SIGN UP', iconType: 'user-add' },
      { path: routes.SIGN_IN, text: 'SIGN IN', iconType: 'login' }
    ],

    banner: {
      introduction: 'Team 13\'s Event-box web application.',
      button: 'See more'
    },

    firstSection: {
      title: [{ key: '0', name: 'title', text: 'Products and Services' }], // name !== title => subtitle
      block: [
        {
          key: '0',
          iconLink: 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
          title: 'One-stop service access',
          description: 'Four times the efficiency of payment, settlement, and accounting access products.'
        },
        {
          key: '1',
          iconLink: 'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
          title: 'One-stop risk monitoring',
          description: 'Prior risk control and quality control capabilities in all requirements configuration.'
        },
        {
          key: '2',
          iconLink: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
          title: 'One-stop data operation',
          description: 'Precipitation product access efficiency and operational small two work efficiency data.'
        }
      ]
    },

    secondSection: {
      title: [
        { key: '0', name: 'title', text: 'Customer case' },
        {
          key: '1', name: 'content',
          text: 'Here is a case study of the case of the service.'
        }
      ], // name !== title => subtitle
      block: [
        {
          key: '0',
          imgLink: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          text: 'Ant Design'
        },
        {
          key: '1',
          imgLink: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          text: 'Ant Motion'
        },
        {
          key: '3',
          imgLink: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          text: 'Ant Design'
        },
        {
          key: '4',
          imgLink: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          text: 'Ant Motion'
        },
        {
          key: '5',
          imgLink: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          text: 'Ant Design'
        },
        {
          key: '6',
          imgLink: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          text: 'Ant Motion'
        },
        {
          key: '7',
          imgLink: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          text: 'Ant Design'
        },
        {
          key: '8',
          imgLink: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          text: 'Ant Motion'
        }
      ]
    },

    thirdSection: {
      title: [
        { name: 'title', text: 'Ant Financial Cloud provides professional services' },
        { name: 'content', text: 'Based on Alibaba Cloud\'s powerful basic resources' }
      ],
      block: [
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png',
          title: 'Enterprise resource management',
          content: 'Cloud resources are centrally choreographed, elastically scalable.'
        },
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
          title: 'Cloud security',
          content: 'The complete cloud security system built according to the security.'
        },
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
          title: 'Cloud monitoring' ,
          content: 'Centralized monitoring of distributed cloud environments.'
        },
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
          title: 'Mobile',
          content:  'One-stop mobile financial APP development and comprehensive monitorin.'
        },
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
          title: 'Distributed middleware' ,
          content: 'Financial-grade online transaction processing middleware,.'
        },
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
          title: 'Big Data',
          content: 'One-stop, full-cycle big data collaborative work platform.'
        }
      ]
    },

    footer: {
      block: [
        {
          title: 'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg',
          content: 'Animation specification and components of Ant Design.'
        },
        {
          title: 'Products',
          content: (
            <span>
              <p><span href="#">Product update record</span></p>
              <p><span href="#">API documentation</span></p>
              <p><span href="#">Quick start</span></p>
              <p><span href="#">Reference guide</span></p>
            </span>
          )
        },
        {
          title: 'Introduction',
          content: (
            <span>
              <p><span href="#">FAQ</span></p>
              <p><span href="#">Contact us</span></p>
            </span>
          )
        },
        {
          title: 'Resources',
          content: (
            <span>
              <p><span href="#">Ant Design</span></p>
              <p><span href="#">Ant Design</span></p>
              <p><span href="#">Ant Design</span></p>
              <p><span href="#">Ant Design</span></p>
            </span>
          )
        }
      ],
      copyright: (
        <span>
          ©2018 by <a href='https://ant.design'>Ant Motion</a> All Rights Reserved
        </span>
      )
    }
  },

  Vietnamese: {
    navigationItems: [
      { key: '0', path: '/', text: 'MỤC 1' },
      { key: '1', path: '/', text: 'MỤC 2' },
      { key: '2', path: '/', text: 'MỤC 3' },
      { key: '3', path: '/', text: 'MỤC 4' }
    ],

    banner: {
      introduction: 'Sản phẩm ứng dụng website Event-box phát triển bởi nhóm 13.',
      button: 'Xem thêm'
    },

    firstSection: {
      title: [{ key: '0', name: 'title', text: 'Sản phẩm và Dịch vụ' }], // name !== title => subtitle
      block: [
        {
          key: '0',
          iconLink: 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
          title: 'Truy cập dịch vụ',
          description: 'Bốn lần hiệu quả thanh toán, thanh toán, và kế toán truy cập sản phẩm.'
        },
        {
          key: '1',
          iconLink: 'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
          title: 'Giám sát rủi ro',
          description: 'Kiểm soát rủi ro trước và khả năng kiểm soát chất lượng trong tất cả các cấu hình yêu cầu.'
        },
        {
          key: '2',
          iconLink: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
          title: 'Hoạt động dữ liệu',
          description: 'Lượng mưa hiệu quả truy cập sản phẩm và hoạt động nhỏ hai dữ liệu hiệu quả công việc.'
        }
      ]
    },

    secondSection: {
      title: [
        { key: '0', name: 'title', text: 'Trường hợp khách hàng' },
        {
          key: '1', name: 'content',
          text: 'Dưới đây là một trường hợp nghiên cứu về trường hợp của dịch vụ.'
        }
      ], // name !== title => subtitle
      block: [
        {
          key: '0',
          imgLink: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          text: 'Ant Design'
        },
        {
          key: '1',
          imgLink: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          text: 'Ant Motion'
        },
        {
          key: '3',
          imgLink: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          text: 'Ant Design'
        },
        {
          key: '4',
          imgLink: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          text: 'Ant Motion'
        },
        {
          key: '5',
          imgLink: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          text: 'Ant Design'
        },
        {
          key: '6',
          imgLink: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          text: 'Ant Motion'
        },
        {
          key: '7',
          imgLink: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          text: 'Ant Design'
        },
        {
          key: '8',
          imgLink: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          text: 'Ant Motion'
        }
      ]
    },

    thirdSection: {
      title: [
        { name: 'title', text: 'Ant Financial Cloud cung cấp dịch vụ chuyên nghiệp' },
        { name: 'content', text: 'Dựa trên các tài nguyên cơ bản mạnh mẽ của Alibaba Cloud' }
      ],
      block: [
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png',
          title: 'Quản lý tài nguyên doanh nghiệp',
          content: 'Tài nguyên đám mây được biên đạo tập trung, có khả năng co giãn linh hoạt.'
        },
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
          title: 'Bảo mật đám mây',
          content: 'Hệ thống bảo mật đám mây hoàn chỉnh được xây dựng theo yêu cầu bảo mật.'
        },
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
          title: 'Giám sát đám mây' ,
          content: 'Giám sát tập trung các môi trường đám mây phân tán, các chế độ xem trạng thái.'
        },
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
          title: 'Di động',
          content:  'Phát triển APP tài chính di động một cửa và giám sát toàn diện.'
        },
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
          title: 'Phân phối trung gian' ,
          content: 'Phần mềm trung gian xử lý giao dịch trực tuyến cấp tài chính.'
        },
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
          title: 'Dữ liệu lớn',
          content: 'Nền tảng làm việc cộng tác dữ liệu lớn một chu kỳ, một chu kỳ.'
        }
      ]
    },

    footer: {
      block: [
        {
          title: 'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg',
          content: 'Đặc tả hoạt hình và các thành phần của Ant Design.'
        },
        {
          title: 'Các sản phẩm',
          content: (
            <span>
              <p><span href="#">Hồ sơ cập nhật sản phẩm</span></p>
              <p><span href="#">Tài liệu API</span></p>
              <p><span href="#">Bắt đầu nhanh</span></p>
              <p><span href="#">Hướng dẫn tham khảo</span></p>
            </span>
          )
        },
        {
          title: 'Giới thiệu',
          content: (
            <span>
              <p><span href="#">Câu hỏi thường gặp</span></p>
              <p><span href="#">Liên hệ chúng tôi</span></p>
            </span>
          )
        },
        {
          title: 'Tài nguyên',
          content: (
            <span>
              <p><span href="#">Ant Design</span></p>
              <p><span href="#">Ant Design</span></p>
              <p><span href="#">Ant Design</span></p>
              <p><span href="#">Ant Design</span></p>
            </span>
          )
        }
      ],
      copyright: (
        <span>
          ©2018 by <a href='https://ant.design'>Ant Motion</a> All Rights Reserved
        </span>
      )
    }
  }
}
