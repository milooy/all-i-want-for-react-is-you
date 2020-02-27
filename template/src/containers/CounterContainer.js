import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; // **** (1) 불러오기
import Counter from '../components/Counter';
import * as counterActions from '../store/modules/counter';
import * as postActions from '../store/modules/post';

class CounterContainer extends Component {
	componentDidMount() {
		// 컴포넌트가 처음 마운트 될 때 현재 number 를 postId 로 사용하여 포스트 내용을 불러옵니다.
		const { number } = this.props;
		console.log(this.props);
		this.getPost(number);
	}

	componentWillReceiveProps(nextProps) {
		// 현재 number 와 새로 받을 number 가 다를 경우에 요청을 시도합니다.
		if (this.props.number !== nextProps.number) {
			this.getPost(nextProps.number);
		}
	}

  getPost = async (postId) => {
    const { PostActions } = this.props;
    try {
      await PostActions.getPost(postId);
    } catch(e) {
      alert("에러!", e)
    }
  }

	handleIncrement = () => {
		this.props.CounterActions.increment();
	};
	handleDecrement = () => {
		this.props.CounterActions.decrement();
	};
	render() {
		const { color, number, post, error, loading } = this.props;
		return (
			<div>
				<Counter
					color={color}
					value={number}
					onIncrement={this.handleIncrement}
					onDecrement={this.handleDecrement}
				/>
				{loading && <h2>로딩중...</h2>}
				{error ? (
					<h1>에러발생!</h1>
				) : (
					<div>
						<h1>{post.title}</h1>
						<p>{post.title}</p>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = ({ counter, post }) => ({
	color: counter.get('color'),
	number: counter.get('number'),
	post: post.data,
	loading: post.pending,
	error: post.error,
});

// 함수가 아닌 객체 설정시 자동 bindActionCreators 됨
// const mapDispatchToProps = { increment, decrement };
const mapDispatchToProps = dispatch => ({
	CounterActions: bindActionCreators(counterActions, dispatch),
	PostActions: bindActionCreators(postActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
