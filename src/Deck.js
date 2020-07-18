import React, { Component } from "react"
import Card from './Card'
import "./Deck.css"

class Deck extends Component{
    constructor(props){
        super(props)
        this.state={Deck_id:"",cards:[],remaining:52,fetching:true}
        this.handleClick=this.handleClick.bind(this);
    }
 componentDidMount(){
    let deck_id=""
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle").then(function(res){
            return res.json()
        }).then(function(data){
            deck_id=data.deck_id          
            this.setState({Deck_id:deck_id,fetching:false})
        }.bind(this)).catch(function(err){
            console.log(err)
        })
            }

    handleClick(evt){
        
        fetch(`https://deckofcardsapi.com/api/deck/${this.state.Deck_id}/draw/`).then(function(res){
            return res.json()
        }
        ).then(function(data){
            
            let newCard={
                alt:data.cards[0].value+" of "+data.cards[0].suit,
                imageUrl:data.cards[0].images.png,
                angle:this.randomAngle(),
                position:`translate(${this.randomPosition()}px,${this.randomPosition()}px)`
            }
            this.setState(st=>{
                return{
                cards:[...st.cards,newCard],
                remaining:data.remaining
                }
            })

        }.bind(this)).catch(function(err){
            console.log(err)
            
        })
    

    }
    randomAngle(){
       return Math.random()*90-45
    }
    randomPosition(){
        return Math.random()*40-20
    }
    render(){
      return( <div style={{height:"100vh"}}>
            <h1>Card Dealer</h1>
            {this.state.remaining>0?<div><button onClick={this.handleClick}className="Deck-btn">Draw a Card</button></div>:""}
            <div style={{position:"relative",display:"flex",justifyContent:"center",alignItems:"center",top:"20%"}}>
      {this.state.cards.map((x,i)=>{return<Card alt={this.state.cards[i].alt} angle={this.state.cards[i].angle}position={this.state.cards[i].position} imageUrl={this.state.cards[i].imageUrl}key={this.state.cards[i].alt}zIndex={i}></Card>})}
      </div> 
        </div>

      )
    }
}
export default Deck