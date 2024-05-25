import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    background-color: #FFFFFF;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    border-radius: 16px;
`;

function ContainerBox({ children, className, style }) {
    return (
        <Container className={`${className ? className : ''}`} style={{ ...style }}>
            {children}
        </Container>
    )
}

export default ContainerBox;