import React, { Component } from 'react'
import PropTypes from "prop-types"
export default class index extends Component {
    state = {
        marginLeft:0
    }
    static defaultProps = {
        imgSrcs:[],
        imgWidth:520,
        height:280
    }
    static propType = {
        imgSrcs:PropTypes.arrayOf(PropTypes.string).isRequired,
        imgWidth:PropTypes.number.isRequired,//S单张图片宽度
        imgHeight:PropTypes.number.isRequired,//单张图片高度
        duration:PropTypes.number.isRequired //在某段时间内完成动画切换

    }

    // 定时器的间隔时间
    tick = 16
    // 定时器
    timer = null


    /**
     * 切换到第几张图片
     * 调用该函数，此组件会经过一段动画
     * @param {*} index
     */

    switchTo(index){
        // 法一：这里面修改state里的marginLeft
        // 法二：直接操作dom元素，ref

        // this.div

        //1.设置index
        if(index < 0){

            index = 0
        }else if(index > this.props.imgSrcs.length - 1){

            index = this.props.imgSrcs.length - 1
        }

        //2.根据Index计算最终的marginLef
        const targetLeft = -index * this.props.imgWidth

        // 3.到当前的marginLeft
        let curLeft = parseFloat(getComputedStyle(this.div).marginLeft)

        //4. 计算运动的次数 = 总时间 / 一次运动的时间
        const times = Math.ceil(this.props.duration / this.tick)
        let curTimes = 0 // 当前运动的次数

        //5. 计算每次运动的距离
        const totalDis = targetLeft - curLeft // 总距离
        const dis = totalDis / times // 每次运动的距离

        // 先停止之前的动画
        clearInterval(this.timer)
        this.timer= setInterval(() => {
            curTimes++ 
            curLeft += dis

            this.div.style.marginLeft = curLeft + 'px'
            if(times === curTimes){
                this.div.style.marginLeft = targetLeft+'px'
                clearInterval(this.timer)
            }
        }, this.tick);




        

    }
    containerRef = el => {
        this.div = el
    }

    render() {
        let imgs = this.props.imgSrcs.map((src,i) => <img src={src} key={i} style={{
            width:this.props.imgWidth,
            height:this.props.imgHeight,
            float:"left"
        }} alt=""/>)
        return (
            <div 
            ref={this.containerRef}
            style={{
                width:this.props.imgSrcs.length *this.props.imgWidth,
                height:this.props.imgHeight,
                marginLeft:this.state.marginLeft
            }}>
                {imgs}
                
            </div>
        )
    }
}
