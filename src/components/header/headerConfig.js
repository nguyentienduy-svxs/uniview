export { ENTITLEMENTS } from '../../data/user'

import { ENTITLEMENTS } from '../../data/user'

export const mainNavigation = [
  {
    label: 'Trang chủ',
    to: '/',
    end: true,
  },
  {
    label: 'Khám phá ngành',
    to: '/majors',
  },
  {
    label: 'Khám phá trường',
    to: '/universities',
  },
]

export const admissionTools = [
  {
    label: 'Admission Checker',
    description:
      'Đối chiếu điểm với dữ liệu tuyển sinh',
    to: '/admission-checker',
    requiredEntitlement: null,
  },

  {
    label: 'Admission Route Mapping',
    description:
      'Xem các con đường tuyển sinh liên quan',
    to: '/admission-route-mapping',
    requiredEntitlement:
      ENTITLEMENTS.ADMISSION_PASS,
  },

  {
    label: 'Scenario Comparison',
    description:
      'Thử các kịch bản điểm và điều kiện',
    to: '/scenario-comparison',
    requiredEntitlement:
      ENTITLEMENTS.ADMISSION_PASS,
  },
]
