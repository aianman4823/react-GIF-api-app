import React from 'react';
import { render } from 'react-dom';

import "./App.css";

import {Search} from './components/Search';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super()
        // image のurlのリストをもつ
        this.state = {
            gifUrlList: []
        };
    }

    //コンポーネントがマウントされた時に実行
    componentDidMount() {
        this.giphyApi();
    }

    giphyApi=target=> {
        //リクエスト先のURLを作る
        const search = target;
        const key = "UMZXSG2vdpAKm5xhgAIw9aIhx01uhTCc";
        const limit = 10;
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${search}&limit=${limit}&lang=ja`;


        //axiosでリクエストをする
        axios.get(url).then(res => {
            const data = res.data.data;
            //必要なURLの配列を作る
            const imageUrlList = data.map(item => item.images.downsized.url);
            // stateを取得した情報を元に変更
            this.setState({ gifUrlList: imageUrlList });
        });
    }

    //img 要素のリストを作るメソッド
    renderImageList(list){
        const imageList=list.map(url=>{
            return(
                <li className="item">
                    <img className="image" src={url}/>
                </li>
            );
        });

        return <ul className="list">{imageList}</ul>
    }


    render() {
        console.log(this.state.gifUrlList);
        return(
            <div>
                <Search search={this.giphyApi}/>
                {this.renderImageList(this.state.gifUrlList)}
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));