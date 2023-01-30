import { get } from 'lodash'
import { QuestionActionTypes } from '../actions/question'
import { toastError, toastSuccess } from '../../util/toastHelper'

const init = {
  loading: true,
  detail: null,
  processing: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case QuestionActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      }
    case QuestionActionTypes.CLEAR_STATE:
      return {
        ...init,
      }
    case QuestionActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      }
    case QuestionActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, 'payload.total'),
        list: get(action, 'payload.list', []),
      }
    case QuestionActionTypes.GET_TYPE:
      return {
        ...state,
        loading: true,
        type: [],
      }
    case QuestionActionTypes.GET_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        type: get(action, 'payload.list', []),
      }
    case QuestionActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      }
    case QuestionActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      }
    case QuestionActionTypes.CREATE:
    case QuestionActionTypes.UPDATE:
    case QuestionActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      }
    case QuestionActionTypes.GET_LIST_ERROR:
    case QuestionActionTypes.GET_TYPE_ERROR:
    case QuestionActionTypes.GET_DETAIL_ERROR:
    case QuestionActionTypes.CREATE_ERROR:
    case QuestionActionTypes.UPDATE_ERROR:
    case QuestionActionTypes.DELETE_ERROR:
      var { message } = action.payload
      toastError(message)
      return {
        ...state,
        processing: false,
      }
    case QuestionActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công')
      return {
        ...state,
        processing: true,
      }
    case QuestionActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công')
      return {
        ...state,
        processing: true,
      }
    case QuestionActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công')
      return {
        ...state,
        processing: false,
      }
    default:
      return state
  }
}
