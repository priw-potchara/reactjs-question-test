import React, { useEffect, useState } from 'react';
import ContainerBox from '../../components/container-box';
import styled from 'styled-components';
import { useWebDetail } from '../../provider';
import imgGoldMedal from '../../static/images/gold-medal.png'

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 96px);
  margin: 48px 0px;

  .container-box {
    min-width: 240px;
    max-width: 900px;
    width: 100%;
    margin: 0px 16px;
    padding: 0px;
    overflow: hidden;
  }
`;

const BodyBox = styled.div`
  height: calc(100% - 120px);
  max-height: 600px;
  padding: 0px 24px 24px 24px;
  overflow: auto;
`;

const HeaderBox = styled.div`
  background-color: #224289;
  color: #FFFFFF;
  padding: 32px;

  .label-question {
    font-size: 32px;
  }
`

const Row = styled.div`
  color: #6D6E71;
  font-size: 24px;
  padding: 24px 0px 0px 0px;

  &.top{
    font-size: 32px;
    font-weight: bold;
    color: #AA182C;
  }

  .label-number {
    margin-right: 8px;
  }

  .label-point {
    margin-left: auto;
    margin-right: 0px;
  }
`

function LeaderboardPage() {
  const [storageChange, setStorageChange] = useState(false);
  const [peopleSum, setPeopleSum] = useState([])

  useEffect(() => {
    // return
    const func = async () => {
      let detail = {}
      try {
        detail = JSON.parse(localStorage.getItem("webdetail"));
      } catch { }
      onSetPeopleSum(detail?.people || []);
    }
    func()

    const handleStorageChange = () => {
      // Update state to trigger re-render
      setStorageChange((prev) => !prev);
      func()
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [])

  const onSetPeopleSum = (params) => {
    let list = JSON.parse(JSON.stringify(params))
    list.sort((a, b) => b.sum - a.sum)
    setPeopleSum(list)
  }

  return (
    <Container className='content-center'>
      <ContainerBox className={`container-box`}>
        <HeaderBox>
          <div className='content-center label-question'>
            Leaderboard
          </div>
        </HeaderBox>
        <BodyBox>
          {peopleSum.map((value, index) => {
            return (
              <Row key={index} className={`${index === 0 ? "top" : ""} vertical-center`}>
                {(index === 0) &&
                  <div className='content-center' style={{ marginRight: "8px" }}>
                    <img style={{ width: "32px" }} src={imgGoldMedal} />
                  </div>
                }
                <div className='label-number'>{index + 1}.</div>
                <div>{value.name}</div>
                <div className='label-point'>{value.sum} points</div>
              </Row>
            )
          })}
          {(!peopleSum || Array.isArray(peopleSum) && peopleSum.length === 0) &&
            <div className='content-center'
              style={{ color: "#6D6E71", fontSize: "24px", padding: "32px" }}>
              No Data.
            </div>
          }
        </BodyBox>
      </ContainerBox>
    </Container>
  );
}

export default LeaderboardPage;

//#AA182C
//#6D6E71
//#E6E7E8
//#224289