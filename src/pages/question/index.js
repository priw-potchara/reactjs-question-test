import React, { useEffect, useState } from 'react';
import ContainerBox from '../../components/container-box';
import styled from 'styled-components';
import QuestionBox from '../../components/question-box';
import question from '../../static/questions';
import { useWebDetail } from '../../provider';

const HeaderBox = styled.div`
  background-color: #224289;
  color: #FFFFFF;
  padding: 32px 24px;

  .label-question {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .label-name {
    font-size: 20px;
    margin-right: 8px;
    min-width: 72px;
  }

  .input-name {
    font-size: 24px;
    max-width: 300px;
    width: 100%;
    border-radius: 4px;
    padding: 8px;
  }
`

const HLine = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 16px;
  border-bottom: 1px solid #E6E7E8;
`;

const ButtonSubmit = styled.button`
  padding: 16px 24px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #AA182C;
  color: #FFFFFF;
  transition: all 0.2s ease;
  border: 1px solid #AA182C;

  &:hover {
    background-color: #FFFFFF;
    color: #AA182C;
    border: 1px solid #AA182C;
}

  &:active {
    background-color: #AA182C33;
  }

  &:disabled {
    background-color: #E6E7E8;
    color: #6D6E71;
    border: 1px solid #6D6E71;
    cursor: default;
}
`;

function QuestionPage() {
  const [randomQuestion, setRandomQuestion] = useState([])
  const [disableSubmit, setDisableSubmit] = useState(true)
  const { webDetail, setWebDetail } = useWebDetail()
  const [inputName, setInputName] = useState("")

  useEffect(() => {
    const func = async () => {
      onInitQuestion();
    }
    func()
  }, [])

  useEffect(() => {
    let model = randomQuestion.find(x => {
      let _model = x.choice.find(_x => _x.selected)
      return _model ? false : true;
    })
    const disabled = model || !inputName ? true : false;
    setDisableSubmit(disabled)
  }, [randomQuestion, inputName])

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  }

  const onInitQuestion = () => {
    let _question = JSON.parse(JSON.stringify(question));
    let questionSelected = [];
    for (let i = 0; i < 20; i++) {
      const randomQuestion = randomNumber(0, _question.length - 1);
      let detail = {
        ..._question[randomQuestion],
      }
      // ========== ========== ========== ==========
      let choiceSelected = [];
      if (Array.isArray(detail?.choice)) {
        let indexChoice = detail?.choice?.findIndex(x => x.choice_id === detail.answer_choice_id);
        choiceSelected.push({
          ...detail?.choice[indexChoice],
          // selected: true,
        });
        detail.choice.splice(indexChoice, 1);
        for (let j = 0; j < 3; j++) {
          const randomChoice = randomNumber(0, detail.choice.length - 1);
          choiceSelected.push(detail.choice[randomChoice]);
          detail.choice.splice(randomChoice, 1);
        }
        choiceSelected = shuffleArray(choiceSelected);
        detail.choice = choiceSelected;
      }
      // ========== ========== ========== ==========
      questionSelected.push(detail);
      _question.splice(randomQuestion, 1);
    }
    setRandomQuestion(questionSelected);
  }

  const handleSelectedChoice = (indexQ, indexChoice) => {
    let detail = JSON.parse(JSON.stringify(randomQuestion));
    detail[indexQ].choice?.map((value, index) => {
      value.selected = index === indexChoice ? true : false;
      return value;
    })
    setRandomQuestion(detail);
  }

  const handleRandomAns = () => {
    return
    let _question = JSON.parse(JSON.stringify(randomQuestion))
    for (let item of _question) {
      const selected = randomNumber(0, 3);
      item.choice = item.choice.map((value, index) => {
        value.selected = (selected === index) ? true : false;
        return value
      })
    }
    setRandomQuestion(_question)
  }

  const handleClickSubmit = (params) => {
    let detail = {}
    try {
      detail = JSON.parse(localStorage.getItem("webdetail"));
    } catch { }
    let sum = 0;
    for (let item of randomQuestion) {
      let model = item.choice.find(x => x.selected);
      if (model?.choice_id === item.answer_choice_id) {
        sum++;
      }
    }
    let person = {
      name: inputName,
      question: randomQuestion,
      sum: sum,
    }
    if (Array.isArray(detail.people)) {
      person.id = detail.people.length + 1;
      detail.people.push(person);
    } else {
      person.id = 1;
      detail.people = [person];
    }
    // ========== ========== ========== ==========
    localStorage.setItem("webdetail", JSON.stringify(detail))
    setInputName("")
    onInitQuestion();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  }

  return (
    <div className='horizontal-center' style={{ margin: "48px 0px" }}>
      <ContainerBox style={{ minWidth: "240px", maxWidth: "900px", width: "100%", margin: "0px 16px", padding: "0px", overflow: "hidden" }}>
        <HeaderBox>
          <div className='label-question'
            onClick={handleRandomAns}
          >
            Questions (20)
          </div>
          <div className='vertical-center'>
            <div className='label-name'>
              Name :
            </div>
            <input className='input-name' value={inputName} onChange={(e) => setInputName(e.target.value)} />
          </div>
        </HeaderBox>
        <HLine />
        <div style={{ padding: "0px 24px 24px 24px" }}>
          {randomQuestion.map((value, index) => {
            return (
              <div key={index}>
                <QuestionBox
                  question={`${index + 1}. ${value.question} ?`}
                  choice={value.choice}
                  onSelected={(e) => { handleSelectedChoice(index, e) }}
                />
                <HLine style={{ marginTop: "16px" }} />
              </div>
            )
          })}
          <div style={{ display: "flex", justifyContent: "end" }}>
            <ButtonSubmit
              disabled={disableSubmit}
              onClick={handleClickSubmit}
            >
              Submit
            </ButtonSubmit>
          </div>
        </div>
      </ContainerBox>
    </div>
  );
}

export default QuestionPage;

//#AA182C
//#6D6E71
//#E6E7E8
//#224289