import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secundary: string;

      background: string;
      red: string;
      grey: string;
      username: string;
      userChat: string;
      otherChat: string;
      title: string;
      text: string;
      button: string;
      blackOpacity: string;
      inputColor: string;
      inputPlaceholder: string;
      chatBackground: string;
      chatInputColor: string;
      titleSplash: string;
    };
  }
}
