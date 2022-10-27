import styled from 'styled-components';
import logo from '../../Images/bravasologo.png';
export const ButtonPrimary = styled.button`
    border-radius: 4px;

    padding: ${({ size }) => (size === 'small' ? '7px 15px' : '5px 40px')};

    font-size: ${({ font_size }) => (font_size === undefined ? '20px' : font_size)};
    text-align: center;
    color: white;
    text-transform: capitalize;
    background-color: #6a5de3;
    border: none;
    box-shadow: 5px 5px 5px #bfbfbf;
    width: ${({ width_full }) => (width_full === undefined ? 'auto' : width_full + '%')};
    &:hover {
        background-color: #65c0b5;
        color: white;
    }
`;

export const ButtonSecondary = styled.button`
    border-radius: 5px;

    padding: ${({ size }) => (size === 'small' ? '5px 5px' : '5px 40px')};

    font-size: ${({ text_size }) => (text_size === undefined ? ' 14pxs' : text_size)};
    text-align: center;
    color: ${({ text_color }) => (text_color === undefined ? ' white' : text_color)};
    text-transform: capitalize;
    background: ${({ back_color }) => (back_color === undefined ? ' #6a5de3' : back_color)};
    border: none;
    box-shadow: 5px 5px 5px #bfbfbf;
    width: ${({ width_full }) => (width_full === undefined ? 'auto' : width_full + '%')};
    &:hover {
        background-color: ${({ back_color_hover }) => (back_color_hover === undefined ? ' #6a5de3' : back_color_hover)};
        color: white;
    }
`;

export const ButtonOtline = styled.button`
    border-radius: 4px;
    background: white;
    padding: 5px;
    box-shadow: 5px 5px 5px #bfbfbf;
    font-size: 14px;
    text-align: center;
    color: #6d6d6d;
    text-transform: capitalize;
    border: 1px solid #6a5de3;

    width: ${({ width_full }) => (width_full === undefined ? 'auto' : width_full + '%')};
    &:hover {
        background-color: #eeeeee;
        // color: white;
    }
`;

// export const ImageBox = styled.img`
//     border-radius: 15px 15px 15px 15px;
//     transition: all 0.2s ease-in;
//     overflow: hidden;
//     &:hover {
//         tranform: scale(1, 15);
//         padding-top: -20px;
//         transition: all 0.2s ease-in;
//     }
// `;

export const Imglogo = styled.img`
    width: 100px;
    height: 100px;
    src: ${logo};
`;
export const LabelDiscount = styled.span`
position: absolute;
padding:${({ discount }) => (discount === 0 ? '0px' : '3px')};
font-size:14px;
top:${({ top }) => top};
left:${({ left }) => left};
font-weight: 600;
border-radius:5px;
background: #FF4747;
color: white ;


 '
`;

// export const LabelDiscount = styled.h6`
// position: absolute;
// padding:${({ discount }) => (discount === 0 ? '0px' : '7px')};
// font-size:15px;
// top:5px;
// left:5px;
// font-weight: 600;
// border-radius:5px;
// background: #CDC9F5;
// color: #7E2EEB ;

//  '
// `;
