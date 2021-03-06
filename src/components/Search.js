import React from 'react';

export class Search extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:""
        };
    }
    render(){
        return(
            <div>
                <h2>Find Your GIF</h2>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.title} onChange={this.handleChange}/>
                    <input type="submit" value="Search!!"/>
                </form>
            </div>
        );
    }

    handleChange=event=>{
        const title = event.target.value;
        this.setState({
            title:title
        });
    };

    handleSubmit=(e)=>{
        e.preventDefault();
        //受け取ったメソッドを実行し、appのstateを変更している
        this.props.search(this.state.title);
        this.setState({title:""});
    };
}