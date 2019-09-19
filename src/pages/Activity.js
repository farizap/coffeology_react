import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

// import material-ui
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
// import component

import History from "../components/history";
import MyBrew from "../components/myBrew";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        marginRight: "-15px",
        marginLeft: "-15px",
        marginTop: "-25px"
    }
}));

const useStylesFab = makeStyles(theme => ({
    fab: {
        // margin: theme.spacing(1)
        position: "fixed",
        bottom: "90px",
        marginLeft: "150px"
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

export default function FullWidthTabs() {
    const classes = useStyles();
    const classesFab = useStylesFab();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function handleChangeIndex(index) {
        setValue(index);
    }

    return (
        <div>
            {sessionStorage.getItem("token") ? (
                <div></div>
            ) : (
                <Redirect to="/login" />
            )}
            <div className="container-fluid activity px-0">
                <div className="row">
                    <div className="col-12">
                        <div className={classes.root}>
                            <AppBar
                                className="acitivityBar"
                                position="static"
                                color="default"
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab label="Guide Saya" {...a11yProps(0)} />
                                    <Tab label="Histori" {...a11yProps(1)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={
                                    theme.direction === "rtl"
                                        ? "x-reverse"
                                        : "x"
                                }
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel
                                    value={value}
                                    index={0}
                                    dir={theme.direction}
                                >
                                    <MyBrew />
                                </TabPanel>
                                <TabPanel
                                    value={value}
                                    index={1}
                                    dir={theme.direction}
                                >
                                    <History />
                                </TabPanel>
                            </SwipeableViews>
                        </div>
                    </div>
                </div>
            </div>
            {value === 0 ? (
                <Fab
                    color="primary"
                    aria-label="add"
                    className={classesFab.fab}
                >
                    <AddIcon />
                </Fab>
            ) : (
                0
            )}
        </div>
    );
}
