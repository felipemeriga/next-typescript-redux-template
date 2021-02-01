import Link from 'next/link'
import Layout from '../components/Layout'
import {connect} from "react-redux";
import * as React from "react";
import {IStoreState} from "../store/reducers";
import {getTickState} from "../store/selectors";
import {updateTick} from "../store/tick/actions";
import {thunkAsyncFunction} from "../store";
import ITickState from "../store/tick";
import wrapper from "../store";

interface IProps {
    tick: ITickState
    updateAnnouncement: any
}

interface IState {}

interface IDispatchProps {
    onUpdateTick: (message: string) => ITickState,
    thunkAsyncFunction: () => Promise<any>;
}

type Props = IProps & IState & IDispatchProps

class App extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    async componentWillUnmount(): Promise<void> {
        await this.props.thunkAsyncFunction();
    }

    render() {
        return (
            <Layout title="Home | Next.js + TypeScript Example">
                <h1>Hello Next.js 👋</h1>
                <p>
                    <Link href="/about">
                        <a>About</a>
                    </Link>
                </p>
                <div>
                    The current tick state: {this.props.tick.message}
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state: IStoreState): {tick: ITickState} => ({
    tick: getTickState(state)
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
    return {
        onUpdateTick: (message: string) =>
            dispatch(updateTick(message)),
        thunkAsyncFunction: () => dispatch(thunkAsyncFunction())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// As the wrapper is injected in _app.tsx, for every component(page) that will interact with Redux and Thunk
// you need to place this piece of code bellow, that will get the static props from the wrapper, and inject on your
// component
export const getStaticProps = wrapper.getStaticProps(
    ({}) => {
    }
);
