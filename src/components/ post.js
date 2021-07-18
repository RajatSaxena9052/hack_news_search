import React from "react";

export default class Post extends React.Component {
    constructor() {
        super()
    }

    timeConvertor = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + "@" + hour + ':' + min + ':' + sec;
        return time;
    }

    render() {
        // console.log(this.props.data.time);
        const { title, by: author, url, score: points, descendants: comments, time } = this.props.data

        return (
            <div className="post-list">
                <div id="subpart"><p>{title}</p><a href={url}>({url})</a></div>
                <div id="verySmallText"><p>{points}points</p>|<p>by{author}</p>|<p>{this.timeConvertor(time)}</p>|<p>{comments}comments</p></div>
            </div>
        )
    }

}
