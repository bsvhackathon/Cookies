export default theme => ({
  oracle_link_container: {
    display: 'flex',
    padding: '6px 0px',
    flexDirection: 'row',
    '@media (max-width: 680px) and (min-width: 0px)': {
      flexDirection: 'column',
      alignItems: 'center'
    },
    justifyContent: 'center',
    gap: '2px'
  },
  oracle_link: {
    margin: '0 auto',
    minWidth: '10em',
    padding: '0.8em',
    border: `1px solid ${theme.palette.primary.secondary}`,
    borderRadius: '8px',
    '&:hover': {
      border: '1px solid #eeeeee00',
      background: theme.palette.background.default
    }
  },
  oracle_icon: {
    width: '2em',
    height: '2em',
    borderRadius: '6px'
  },
  oracle_title: {
    fontSize: '0.7em'
  },
  oracle_button: {
    borderRadius: '10px'
  },
  oracle_open_title: {
    textDecoration: 'bold',
    marginTop: '2em'
  },
  content_wrap: {
    display: 'grid'
  },
  trust_threshold: {
    maxWidth: '25em',
    minWidth: '20em',
    marginBottom: theme.spacing(5),
    placeSelf: 'center'
  },
  master_grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    gridGap: theme.spacing(2),
    gridColumnGap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridRowGap: theme.spacing(3)
    }
  },
  entity_icon_name_grid: {
    display: 'grid',
    gridTemplateColumns: '4em 1fr',
    alignItems: 'center',
    gridGap: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: '6px'
  },
  clickable_entity_icon_name_grid: {
    display: 'grid',
    gridTemplateColumns: '4em 1fr',
    alignItems: 'center',
    gridGap: theme.spacing(2),
    cursor: 'pointer',
    transition: 'all 0.3s',
    padding: theme.spacing(1),
    borderRadius: '6px',
    '&:hover': {
      boxShadow: theme.shadows[3]
    }
  },
  entity_icon: {
    width: '4em',
    height: '4em',
    borderRadius: '6px'
  },
  slider_label_grid: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gridGap: theme.spacing(2)
  },
  slider_label_delete_grid: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    gridGap: theme.spacing(2)
  }
})
