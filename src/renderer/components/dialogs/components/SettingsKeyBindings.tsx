/**
 * TagSpaces - universal file and folder organizer
 * Copyright (C) 2017-present TagSpaces GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License (version 3) as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import { useEffect } from 'react';
import AppConfig from '-/AppConfig';
import InfoIcon from '-/components/InfoIcon';
import TsTextField from '-/components/TsTextField';
import { AppDispatch } from '-/reducers/app';
import {
  actions as SettingsActions,
  getGlobalKeyBindings,
  getKeyBindings,
  isGlobalKeyBindingEnabled,
} from '-/reducers/settings';
import DefaultSettings from '-/reducers/settings-default';
import { setGlobalShortcuts } from '-/services/utils-io';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { isStr } from '@tagspaces/tagspaces-common/misc';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function SettingsKeyBindings() {
  const { t } = useTranslation();
  const keyBindings = useSelector(getKeyBindings);
  const globalKeyBindings = useSelector(getGlobalKeyBindings);
  const globalKeyBindingEnabled = useSelector(isGlobalKeyBindingEnabled);
  const dispatch: AppDispatch = useDispatch();

  const setKeyBinding = (kbName, kbCommand) => {
    dispatch(SettingsActions.setKeyBinding(kbName, kbCommand));
  };

  const setGlobalKeyBindingEntry = (kbName, kbCommand) => {
    dispatch(SettingsActions.setGlobalKeyBindingEntry(kbName, kbCommand));
  };

  const setGlobalKeyBinding = (value) => {
    dispatch(SettingsActions.setGlobalKeyBinding(value));
    setGlobalShortcuts(value, globalKeyBindings);
  };

  useEffect(() => {
    if (AppConfig.isElectron && globalKeyBindingEnabled) {
      setGlobalShortcuts(true, globalKeyBindings);
    }
  }, [globalKeyBindings]);

  return (
    <Box
      sx={{
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '100%',
        marginLeft: '10px',
      }}
    >
      {AppConfig.isElectron && (
        <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <ListItemText
            primary={
              <>
                {t('core:enableGlobalKeyboardShortcuts')}
                <InfoIcon tooltip="Enables global shortcut for creating new files, file navigation, play/pause audio files or opening the search. Global shortcuts are working even if the app window is not currently in focus or visible." />
              </>
            }
          />
          <Switch
            onClick={() => {
              setGlobalKeyBinding(!globalKeyBindingEnabled);
            }}
            checked={globalKeyBindingEnabled}
          />
        </ListItem>
      )}
      {AppConfig.isElectron && globalKeyBindingEnabled && (
        <>
          <Typography
            variant="subtitle1"
            sx={{ marginTop: '10px', marginBottom: '5px', fontWeight: 'bold' }}
          >
            {t('core:globalKeyboardShortcuts')}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '10px' }}>
            Global shortcuts use Electron accelerator format. Valid modifier
            keys:{' '}
            <Typography variant="overline">
              CommandOrControl, Alt, Shift, Meta
            </Typography>{' '}
            plus letters, digits, and media keys (MediaPlayPause,
            MediaNextTrack, MediaPreviousTrack).
          </Typography>
          {globalKeyBindings.map((keyBinding) => {
            const defaultBinding = DefaultSettings.globalKeyBindings.filter(
              (kb) => kb.name === keyBinding.name,
            )[0];
            return (
              <TsTextField
                sx={{ marginTop: 0, marginBottom: '10px' }}
                key={keyBinding.name}
                autoComplete="off"
                onBlur={(event) =>
                  setGlobalKeyBindingEntry(
                    keyBinding.name,
                    event.target.value,
                  )
                }
                label={t('core:' + keyBinding.name)}
                placeholder={
                  'suggested binding: ' +
                  (defaultBinding ? defaultBinding.command : '')
                }
                defaultValue={
                  isStr(keyBinding.command) ? keyBinding.command : ''
                }
              />
            );
          })}
          <Divider sx={{ marginBottom: '10px' }} />
        </>
      )}
      <Typography variant="body2" sx={{ marginBottom: '10px' }}>
        The following key names can be used for defining key bindings:{' '}
        <Typography variant="overline">
          ctrl, command, alt, option, shift, space, backspace, escape, enter,
          up, down, left, right
        </Typography>{' '}
        plus letters and digits from your keyboard.
      </Typography>
      {keyBindings.map((keyBinding) => {
        const defaultBinding = DefaultSettings.keyBindings.filter(
          (kb) => kb.name === keyBinding.name,
        )[0];
        return (
          <TsTextField
            sx={{ marginTop: 0, marginBottom: '10px' }}
            key={keyBinding.name}
            autoComplete="off"
            onBlur={(event) =>
              setKeyBinding(keyBinding.name, event.target.value)
            }
            label={t('core:' + keyBinding.name)}
            placeholder={
              'suggested binding: ' +
              (defaultBinding ? defaultBinding.command : '')
            }
            defaultValue={isStr(keyBinding.command) ? keyBinding.command : ''}
          />
        );
      })}
    </Box>
  );
}

export default SettingsKeyBindings;
