import React, { Component } from 'react';
import horizontalImage from '../img/horizontal-image.png';
export class Video extends Component {
    titleRef = null;
    constructor(props) {
        super(props);
        this.state = {
            showEditorPanel: false,
            showEditorPanelTab: 0,
            padding_top: 0,
            padding_bottom: 0,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            placeHolder: 'Enter text caption here',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    };

    clearContent = () => {
        this.props.onClickDelete(this.props.location);
    }

    showEditorPanel = () => {
        const { showEditorPanel } = this.state;
        this.setState({ showEditorPanel: !showEditorPanel });
    }

    showEditorPanelTab = (index) => {
        this.setState({ showEditorPanelTab: index });
    }

    setProperties = (sendData) => {
        const { padding_top, padding_bottom, url, description, placeHolder } = this.state;
        const { type } = this.props;
        const properties = {
            type,
            padding_bottom: padding_bottom,
            padding_top: padding_top,
            url: url,
            placeHolder: placeHolder,
            description: description,
            ...sendData
        };
        this.props.setPropertiesData(properties, this.props.location);
        this.setIsActive(true);
    }

    setIsActive = (isActive) => {
        this.setState({
            isActive
        });
    };

    changeProperties = (formContent) => {
        const { padding_top, padding_bottom, url, placeHolder, description } = formContent;
        this.setState({
            padding_top: padding_top,
            padding_bottom: padding_bottom,
            url: url,
            placeHolder: placeHolder,
            description: description,
        });
        // this.props.setPropertiesData(formContent, this.props.location);
    };

    getContent = () => {
        const { padding_top, padding_bottom, url, placeHolder, description } = this.state;
        let style = {
            padding_top,
            padding_bottom,
        }
        return {
            style,
            placeHolder,
            description,
            url,
            type: this.props.type
        };
    };

    render() {
        const { showEditorPanel, showEditorPanelTab, padding_top, padding_bottom, url, description, placeHolder } = this.state;
        return (
            <div className={`d-flex content pt-${padding_top} pb-${padding_bottom}`}>
                <div className="col-md-9 pl-0">
                    <div className="row flex-row flex-wrap left-content position-relative">
                        <div className="col-md-6">
                            <video width="100%" height="240" controls>
                                <source src={url} type="video/mp4" />
                            </video>
                            <div className="d-flex w-100 h-100 align-items-center justify-content-center play-btn">
                                <i className="fas fa-play-circle"></i>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="d-flex flex-wrap right-content">
                        <div className="d-block w-100 editor-buttons">
                            <i className="fal fa-arrow-down"></i>
                            <i className="fal fa-copy"></i>
                            <i className="fal fa-trash" onClick={this.clearContent}></i>
                            <i className="fal fa-pen" onClick={() => this.setProperties({})}></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}