export const colors = {
  skyBlue: '#069ccd',
  whiteGray: '#f7f6f3',
  dusk: 'rgb(65,77,107)',
  green: 'rgb(29,211,168)',
  greenBlue: 'rgb(36,205,151)',
  mediumGray: 'rgb(134,154,183)',
  paleGray: 'rgb(221,226,236)',
  lightBackground: 'white',
  lightBackgroundLight: '#f7f6f3',
  darkBackground: '#323739',
  darkBackgroundLight: '#393241',
};

export type ColorProps = {
  background: string;
  btnPrimary: string;
  btnPrimaryFont: string;
  btnPrimaryLight: string;
  btnPrimaryLightFont: string;
  textDisabled: string;
  btnDisabled: string;
  fontColor: string;
  tintColor: string;
  activeColor: string;
  inActiveColor: string;
  activeTextColor: string;
  inActiveTextColor: string;
};

export const light: ColorProps = {
  background: colors.lightBackground,
  btnPrimary: colors.skyBlue,
  btnPrimaryFont: 'white',
  btnPrimaryLight: colors.whiteGray,
  btnPrimaryLightFont: 'black',
  textDisabled: '#969696',
  btnDisabled: 'rgb(224,224,224)',
  fontColor: 'black',
  tintColor: '#333333',
  activeColor: '#E4F0FF',
  inActiveColor: colors.lightBackground,
  activeTextColor: '#278DFF',
  inActiveTextColor: colors.mediumGray,
};

export type Theme = typeof light;

export const dark: ColorProps = {
  background: colors.darkBackground,
  btnPrimary: colors.skyBlue,
  btnPrimaryFont: 'white',
  btnPrimaryLight: colors.whiteGray,
  btnPrimaryLightFont: 'black',
  textDisabled: '#969696',
  btnDisabled: 'rgb(224,224,224)',
  fontColor: 'white',
  tintColor: '#a3a3a3',
  activeColor: 'black',
  inActiveColor: colors.darkBackground,
  activeTextColor: '#fff',
  inActiveTextColor: 'darkgray',
};
