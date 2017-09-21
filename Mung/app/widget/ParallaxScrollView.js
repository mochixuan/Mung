import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Animated,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';

const ScrollViewPropTypes = ScrollView.propTypes;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const DEFAULT_WINDOW_MULTIPLIER = 0.50;
export const DEFAULT_NAVBAR_HEIGHT = 54;

export default class ParallaxScrollView extends Component {
    constructor() {
        super();

        this.state = {
            scrollY: new Animated.Value(0)
        };
    }

    renderBackground() {
        var { windowHeight, backgroundSource } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }

        return (
            <Animated.Image
                style={[
                    styles.background,
                    {
                        height: windowHeight,
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-windowHeight, 0, windowHeight],
                                    outputRange: [windowHeight / 2, 0, -windowHeight / 3]
                                })
                            },
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-windowHeight, 0, windowHeight],
                                    outputRange: [2, 1, 1]
                                })
                            }
                        ]
                    }
                ]}
                source={backgroundSource}
            >
            </Animated.Image>
        );
    }

    renderHeaderView() {
        var { windowHeight, backgroundSource, userTitle} = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }

        const newWindowHeight = windowHeight - DEFAULT_NAVBAR_HEIGHT;

        return (
            <Animated.View
                style={{
                    opacity: scrollY.interpolate({
                        inputRange: [-windowHeight, 0, windowHeight * DEFAULT_WINDOW_MULTIPLIER + DEFAULT_NAVBAR_HEIGHT],
                        outputRange: [1, 1, 0]
                    })
                }}
            >
                <View style={{height: newWindowHeight, justifyContent: 'center', alignItems: 'center'}}>
                    {this.props.headerView}
                </View>
            </Animated.View>
        );
    }

    renderNavBarTitle() {
        var { windowHeight, backgroundSource, navBarTitleColor } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }

        return (
            <Animated.View
                style={{
                    opacity: scrollY.interpolate({
                        inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
                        outputRange: [0, 0, 1]
                    })
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: '600', color: navBarTitleColor || 'white' }}>
                    {this.props.navBarTitle}
                </Text>
            </Animated.View>
        );
    }

    rendernavBar() {
        var {
            windowHeight, backgroundSource, leftView,
            rightView, navBarColor
        } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return (
            <Animated.View
                style={{
                    height: DEFAULT_NAVBAR_HEIGHT,
                    width: SCREEN_WIDTH,
                    flexDirection: 'row',
                    backgroundColor: scrollY.interpolate({
                        //inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
                        inputRange: [0 ,windowHeight-DEFAULT_NAVBAR_HEIGHT,windowHeight],
                        outputRange: ['transparent',navBarColor,navBarColor]
                    })
                }}
            >
                {leftView &&
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {leftView}
                </View>
                }
                <View
                    style={{
                        flex: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}
                >
                    {this.renderNavBarTitle()}
                </View>
                {rightView &&
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {rightView}
                </View>
                }
            </Animated.View>
        );
    }

    render() {
        var { style, ...props } = this.props;

        return (
            <View style={[styles.container, style]}>
                {this.renderBackground()}
                {this.rendernavBar()}
                <ScrollView
                    ref={component => {
                        this._scrollView = component;
                    }}
                    {...props}
                    style={styles.scrollView}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
                    ])}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                >
                    {this.renderHeaderView()}
                    <View style={[styles.content, props.scrollableViewStyle]}>
                        {this.props.children}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

ParallaxScrollView.defaultProps = {
    windowHeight: SCREEN_HEIGHT * DEFAULT_WINDOW_MULTIPLIER,
};

ParallaxScrollView.propTypes = {
    ...ScrollViewPropTypes,
    backgroundSource: Image.propTypes.source,
    windowHeight: React.PropTypes.number,
    navBarTitle: React.PropTypes.string,
    navBarTitleColor: React.PropTypes.string,
    navBarColor: React.PropTypes.string,
    userTitle: React.PropTypes.string,
    headerView: React.PropTypes.node,
    leftView: React.PropTypes.element,
    rightIcon: React.PropTypes.element
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'transparent'
    },
    scrollView: {
        backgroundColor: 'transparent'
    },
    background: {
        position: 'absolute',
        backgroundColor: '#2e2f31',
        width: SCREEN_WIDTH,
        resizeMode: 'cover'
    },
    content: {
        shadowColor: '#222',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'column'
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listView: {
        backgroundColor: 'rgba(247,247, 250, 1)'
    },
    logoutText: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});