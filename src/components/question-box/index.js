import React from 'react';
import ContainerBox from '../../components/container-box';
import styled from 'styled-components';

function QuestionBox({ question, choice, onSelected }) {

    const handleSelected = (params) => {

    }

    return (
        <div style={{ fontSize: "20px" }}>
            <div style={{ color: "#6D6E71", paddingBottom: "8px" }}>{question}</div>
            <div>
                {Array.isArray(choice) && choice.map((value, index) => {
                    return (
                        <div key={index} style={{ display: "flex", alignItems: "center", padding: "8px" }}>
                            <div style={{ minWidth: "21px", minHeight: "21px", borderRadius: "50%", backgroundColor: "#E6E7E8", marginRight: "8px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}
                                onClick={() => { onSelected && onSelected(index) }}>
                                {value.selected &&
                                    <div style={{ minWidth: "12px", minHeight: "12px", borderRadius: "50%", backgroundColor: "#AA182C" }}>
                                    </div>
                                }
                            </div>
                            <div style={{ color: "#6D6E71" }}>
                                {value.choice}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default QuestionBox;