import React, { ReactElement } from 'react';
import Button from '../shared/Button';
import { DrawerItem } from '@react-navigation/drawer';

import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';
import { useThemeContext } from '../../providers/ThemeProvider';

const FoldContainer = styled.View`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DrawerContentScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const ProfileContainer = styled.View`
  width: 100%;
  height: 300px;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
`;
const StyledText = styled.Text`
  color: '#000000';
  font-weight: 600;
`;

const SectionView = styled.View`
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
`;
const SectionText = styled.Text`
  padding: 0 0 10px 15px;
  color: ${({ theme }): string => theme.fontColor};
  font-weight: 600;
`;

function DrawerContent(props): ReactElement {
  const { changeThemeType, theme } = useThemeContext();
  const { resetUser } = useAppContext();
  const { navigation, state, isOpen, setOpen } = props;

  const currnetRoute = React.useMemo(() => {
    return state.history.pop();
  }, [state]);

  if (!props.isOpen) {
    return (
      <FoldContainer onClick={(): void => setOpen(true)}>
        <StyledText style={{ color: theme.fontColor }}>Menu</StyledText>
      </FoldContainer>
    );
  }
  return (
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      <ProfileContainer>
        <StyledText>Profilebox</StyledText>
      </ProfileContainer>
      <SectionView>
        <SectionText>Router</SectionText>
        {state.routes.map(
          ({ name, key, params }): ReactElement => {
            const isFocused = currnetRoute.key === key;
            return (
              <DrawerItem
                key={key}
                label={name}
                focused={isFocused}
                labelStyle={{
                  color:
                    theme[isFocused ? 'activeTextColor' : 'inActiveTextColor'],
                }}
                onPress={(): void => navigation.navigate(name, params)}
                activeBackgroundColor={theme.activeColor}
                inactiveBackgroundColor={theme.inActiveColor}
              />
            );
          },
        )}
      </SectionView>
      <SectionView>
        <SectionText>Actions</SectionText>
        <Button
          text="Change theme"
          onClick={changeThemeType}
          style={{ width: 300, height: 43, marginVertical: 2 }}
          textStyle={{ color: '#fff' }}
        />
        <Button
          text="Toggle drawer"
          onClick={(): void => setOpen(!isOpen)}
          style={{ width: 300, height: 43, marginVertical: 2 }}
          textStyle={{ color: '#fff' }}
        />
        <Button
          text="Signout"
          onClick={resetUser}
          style={{ width: 300, height: 43, marginVertical: 2 }}
          textStyle={{ color: '#fff' }}
        />
      </SectionView>
    </DrawerContentScrollView>
  );
}

export default DrawerContent;
