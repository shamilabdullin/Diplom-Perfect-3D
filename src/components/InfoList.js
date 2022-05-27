import React from 'react'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { ListItem } from '@mui/material';
import { InfoListItems } from './InfoListItems';
import { Icon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import './InfoList.css'

export default function InfoList({ materialNames, listName }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const itemsCount = materialNames.length

  function renderRow(props) {
    const { index, style } = props;
    console.log(props.index)
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={materialNames[index]} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary={listName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <FixedSizeList
          height={200}
          width={360}
          itemSize={25}
          itemCount={itemsCount}
          overscanCount={1}
        >
        {renderRow}
      </FixedSizeList>
      </Collapse>
    </List>
  );
}
