import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';

const CHANGE_INPUT = 'waiting/CHANGE_INPUT';
const CREATE = 'waiting/CREATE';
const ENTER = 'waiting/ENTER';
const LEAVE = 'waiting/LEAVE';

let id = 3;
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ }));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);

// **** 초기 상태 정의
const initialState = Map({
	input: '',
	list: List([
		Map({
			id: 0,
			name: '홍길동',
			entered: true,
		}),
		Map({
			id: 1,
			name: '콩쥐',
			entered: false,
		}),
		Map({
			id: 2,
			name: '팥쥐',
			entered: false,
		}),
	]),
});

// **** handleActions 로 리듀서 함수 작성
export default handleActions(
	{
		[CHANGE_INPUT]: (state, action) => state.set('input', action.payload),
		[CREATE]: (state, action) =>
			// list 값을 조회한다음에
			state.update('list', list =>
				// list 에 새로운 Map 을 추가
				list.push(
					Map({
						id: action.payload.id,
						name: action.payload.text,
						entered: false,
					}),
				),
			),
		[ENTER]: (state, action) => {
			// 인덱스를 찾고
			const index = state
				.get('list')
				.findIndex(item => item.get('id') === action.payload);
			// 특정 인덱스의 entered 필드 값을 반전
			return state.updateIn(['list', index, 'entered'], entered => !entered);
		},
		[LEAVE]: (state, action) => {
			// 인덱스를 찾고
			const index = state
				.get('list')
				.findIndex(item => item.get('id') === action.payload);
			return state.deleteIn(['list', index]); // 특정 인덱스 제거
		},
	},
	initialState,
);
