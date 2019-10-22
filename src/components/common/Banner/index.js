import React, { Component } from 'react'
import ImgContainer from "./imgContainer"
import SwitchArrow from "./SwitchArrow"
import "./index.css"
import PropTypes from "prop-types"
import SwitchDot from './SwitchDot'

export default class Banner extends Component {

    static defaultProps = {
        width:520, //容器宽
        height:280, //容器高
        imgSrcs:[
            "http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1703/05/c4/38715244_1488685726636.jpg",
            "http://abc.2008php.com/2011_Website_appreciate/2011-09-26/20110926182934.jpg",
            "http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1704/08/c7/42246598_1491649514214.jpg",
            "http://img1.qunarzz.com/travel/d6/1712/42/dcac07ec6f54d8b5.jpg_r_680x424x95_430edb87.jpg"
        ], //图片路径数组
        autoDuration:3000,// 自动切换间隔
        duration:500 //完成一次切换需要的时间
    }

    static propTypes = {
        width:PropTypes.number.isRequired, //容器宽
        height:PropTypes.number.isRequired, //容器高
        imgSrcs:PropTypes.arrayOf(PropTypes.string).isRequired, //图片路径数组
        autoDuration:PropTypes.number.isRequired,// 自动切换间隔
        duration:PropTypes.number.isRequired //完成一次切换需要的时间
    }
    state = {
        curIndex:0 //当前显示的图片
    }

    timer = null //自动切换定时器
    autoSwitch = () =>{
        clearInterval(this.timer)
        this.timer = setInterval(()=>{
            let cur = this.state.curIndex
            cur = (cur + 1)%this.props.imgSrcs.length
            this.handleSwitch(cur)
        },this.props.autoDuration)
    }
    componentDidMount(){
        this.autoSwitch()
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    /**
     * 切换到第几张图片
     */
    handleSwitch = index => {
        this.setState({
            curIndex:index
        })
        // 得到imgContainer的组件对象
        this.imgContainer.switchTo(index)
    }
    imgContainerRef = el => {
        this.imgContainer = el
    }
    handleArrowChange = (type)=>{
        let cur = this.state.curIndex
        if(type === 'left'){
            cur --;
            if(cur < 0){
                cur = this.props.imgSrcs.length - 1
            }
        }else{
            cur++;
            if(cur > this.props.imgSrcs.length - 1){
                cur = 0
            }
        }
        this.handleSwitch(cur)
    }
    render() {
        return (
            <div 
                className="banner-container"
                style={{
                    width:this.props.width,
                    hegiht:this.props.height,
                    
            }}
            onMouseEnter={()=>{
                clearInterval(this.timer)
            }}
            onMouseLeave={()=>{
                this.autoSwitch()
            }}>
                <ImgContainer 
                    ref={this.imgContainerRef}
                    imgSrcs={this.props.imgSrcs}
                    imgWdith={this.props.width}
                    imgHeight={this.props.height} 
                    duration={this.props.duration}
                />
                <SwitchArrow 
                    onChange={this.handleArrowChange}
                />
                <SwitchDot 
                    total={this.props.imgSrcs.length} 
                    curIndex={this.state.curIndex}
                    onChange={this.handleSwitch}
                />
                
            </div>
        )
    }
}
