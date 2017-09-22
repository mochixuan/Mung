import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class MoreTextView extends React.Component {
    state = {
        measured: false,
        shouldShowReadMore: false,
        showAllText: false,
    }

    static propTypes = {
        showText:React.PropTypes.string,
        hideText:React.PropTypes.string,
        textStyle:React.PropTypes.object,
    }

    async componentDidMount() {
        await nextFrameAsync();

        const fullHeight = await measureHeightAsync(this._text);
        this.setState({measured: true});
        await nextFrameAsync();

        const limitedHeight = await measureHeightAsync(this._text);

        if (fullHeight > limitedHeight) {
            this.setState({shouldShowReadMore: true}, () => {
                this.props.onReady && this.props.onReady();
            });
        }
    }

    render() {
        let {
            measured,
            showAllText,
        } = this.state;

        let {
            numberOfLines,
        } = this.props;

        return (
            <View>
                <Text
                    numberOfLines={measured && !showAllText ? numberOfLines : 0}
                    ref={text => { this._text = text; }}>
                    {this.props.children}
                </Text>

                {this._maybeRenderReadMore()}
            </View>
        );
    }

    _handlePressReadMore = () => {
        this.setState({showAllText: true});
    }

    _handlePressReadLess = () => {
        this.setState({showAllText: false});
    }

    _maybeRenderReadMore() {

        let showMore = "More"
        let hideMore = "Hide"
        let textStyle = styles.button
        if (this.props.showText) {
            showMore = this.props.showText
        }
        if (this.props.hideText) {
            hideMore = this.props.hideText
        }
        if (this.props.textStyle) {
            textStyle = [textStyle,this.props.textStyle]
        }

        let {
            shouldShowReadMore,
            showAllText,
        } = this.state;

        if (shouldShowReadMore && !showAllText) {
            if (this.props.renderTruncatedFooter) {
                return this.props.renderTruncatedFooter(this._handlePressReadMore);
            }

            return (
                <Text style={textStyle} onPress={this._handlePressReadMore}>
                    {showMore}
                </Text>
            )
        } else if (shouldShowReadMore && showAllText) {
            if (this.props.renderRevealedFooter) {
                return this.props.renderRevealedFooter(this._handlePressReadLess);
            }

            return (
                <Text style={textStyle} onPress={this._handlePressReadLess}>
                    {hideMore}
                </Text>
            );
        }
    }
}

function measureHeightAsync(component) {
    return new Promise(resolve => {
        component.measure((x, y, w, h) => {
            resolve(h);
        });
    });
}

function nextFrameAsync() {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

const styles = StyleSheet.create({
    button: {
        color: '#888',
    },
});