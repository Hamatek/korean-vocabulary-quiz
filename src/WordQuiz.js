import React, {Component} from 'react';
import { PageHeader, Row, Col } from 'react-bootstrap';
import WordTable from './WordTable'

class WordQuiz extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sample: this.sampleWords(),
    };
  }

  sampleWords() {
    const { words, sampleSize } = this.props

    return words
      .all
      .filter((word) => {
        return /^\d+$/.test(word.rank) && !(/\d/.test(word.term))
      })
      .sort(() => .5 - Math.random())
      .slice(0, sampleSize)
      .map((word, index) => {
        word.setKnow = (value) => {
          const sample = this.state.sample
          sample[index].know = value
          this.setState({ words })
        }

        return word
      })
  }

  calcKnowPerc() {
    const { sample } = this.state

    return sample.filter((word) => word.know).length / sample.length
  }

  render() {
    const { sample } = this.state

    const totalCount = this.props.words.all.length
    const knowPerc = this.calcKnowPerc()

    return (
      <div>
        <Row>
          <Col md={10}>
            <PageHeader>How Many Korean Words Do You Know?</PageHeader>
            <p>
              This is a quiz based on a random sample from the <a href="https://ko.wiktionary.org/wiki/%EB%B6%80%EB%A1%9D:%EC%9E%90%EC%A3%BC_%EC%93%B0%EC%9D%B4%EB%8A%94_%ED%95%9C%EA%B5%AD%EC%96%B4_%EB%82%B1%EB%A7%90_5800">list of the most common Korean words</a> published by the <a href="https://www.korean.go.kr/front_eng/main.do">The National Institute of The Korean Language</a>. For each word below, select if you know the word or not. See your result at the bottom. The idea for this site was inspired by <a href="https://redd.it/72wf0s" target="_blank" rel="noopener noreferrer">this Reddit post</a>.
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <WordTable
              words={sample}
            />
          </Col>
        </Row>

        <Row>
          <Col md={10}>
            <h3>Results</h3>
            <h1>{Math.floor(knowPerc * 100)}%</h1>
            <h6>
              With some super fuzzy, not-so-scientific logic, that means you know {
              knowPerc === 1 ?
                ` at least all ${totalCount} words on the list, but probably at lot more.` :
                ` approximately ${Math.floor(totalCount * knowPerc)} Korean words.`
              }
            </h6>
          </Col>
        </Row>
      </div>
    );
  }
}

export default WordQuiz;
