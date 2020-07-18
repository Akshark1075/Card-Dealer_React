import React,{Component} from 'react'

class Card extends Component{
    render(){
        var deg=this.props.angle;
        
        return (
        <img alt={this.props.alt} src={this.props.imageUrl}style={{zIndex:this.props.zIndex,position:"absolute",top:"20%",transform:`rotate(${deg}deg) ${this.props.position}`}}></img>     )
    }
}
export default Card