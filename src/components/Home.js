import React from 'react'
import { Fade, Jumbotron, Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import axios from "axios"

import { Headline } from './Headline'



class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fadeIn: false,
            articles:[]
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleSearchQuiet = this.handleSearchQuiet.bind(this)


    }

    componentDidMount() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });

    }

    handleSearch(searchItem){
        axios.get('https://newsapi.org/v2/everything?q=' + searchItem +'&sortBy=popularity&apiKey=e2035d9b195548548231466b7993bf99')
            .then((response) => {
                this.setState({articles: response.data.articles});

                let headlines = response.data.articles.map((item) => {
                    return item.title
                })

                let available_voices = window.speechSynthesis.getVoices();

                let english_voice = '';

                for(let i=0; i<available_voices.length; i++) {
                    if(available_voices[i].lang === 'en-US') {
                        english_voice = available_voices[i];
                        break;
                    }
                }
                if(english_voice === '')
                    english_voice = available_voices[0];

                let utter = new SpeechSynthesisUtterance();
                utter.rate = 1;
                utter.pitch = 1;
                utter.text = headlines;
                utter.voice = english_voice;

                utter.onend = function() {
                    console.log('Speech has finished');
                }

                window.speechSynthesis.speak(utter);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally( function() {

        });

    }

    handleSearchQuiet(searchItem){
        axios.get('https://newsapi.org/v2/everything?q=' + searchItem +'&sortBy=popularity&apiKey=e2035d9b195548548231466b7993bf99')
            .then((response) => {
                this.setState({articles: response.data.articles});

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally( function() {

            });

    }



    render(){
        return(
            <div>
                <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                    <Jumbotron>
                        <h1 className="display-6">Your Personal News Anchor</h1>
                        <p className="lead">Search for today's headlines.</p>
                        <div className="row">
                            <div className="col-9">
                                <div className="form-group ">
                                    <div className="row">
                                        <div className="col-7 pr-1">
                                            <Input type="search" name="search" id="search" placeholder="In today's news..." />
                                        </div>
                                        <div className="col-5 pl-1">
                                            <Button type="submit" className="btn btn-primary mr-1" onClick={(e) => {
                                                this.handleSearchQuiet(document.querySelector('#search').value)
                                                e.preventDefault()
                                            }}>Search</Button>
                                            <Button type="submit" className="btn btn-primary mr-1" onClick={(e) => {
                                                this.handleSearch(document.querySelector('#search').value)
                                                e.preventDefault()
                                            }}>Search & Read</Button>
                                            <Button type="submit" className="btn btn-primary mr-1" onClick={(e) => {
                                                window.speechSynthesis.pause();
                                                e.preventDefault()
                                            }}>Pause</Button>
                                            <Button type="submit" className="btn btn-primary mr-1" onClick={(e) => {
                                                window.speechSynthesis.resume();
                                                e.preventDefault()
                                            }}>Resume</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="row">
                            {this.state.articles.map((articles, index) => < Headline key={index} articles={articles}/>)}
                        </div>
                    </Jumbotron>
                </Fade>
        </div>)
    }
}

export default Home