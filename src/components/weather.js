import React from 'react';

const WeatherIcons = (props) => {
    let icon;
    switch (true) {
        case props.iconId >= 200 && props.iconId < 300:
            icon = <ThunderStorm />;
            break;
        case props.iconId >= 300 && props.iconId < 400:
            icon = <SunShower />;
            break;
        case props.iconId >= 500 && props.iconId < 600:
            icon = <Rainy />;
            break;
        case props.iconId >= 600 && props.iconId < 700:
            icon = <Snow />;
            break;
        case props.iconId >= 801 && props.iconId <= 804:
            icon = <Cloudy />;
            break;
        case props.iconId === 800:
            icon = isDay(props.sunrise, props.sunset) ? <Sunny /> : <Moon />;
            break;
        default:
            icon = <Sunny />;
            break;
    }
    return icon;
};

const isDay = (sunrise, sunset) => {
    let d = new Date(),
        now = Math.round(d.getTime() / 1000);
    if (now >= sunrise && now <= sunset) {
        return true;
    }
    return false;
};

const SunShower = () => {
    return (
        <div className="icon sun-shower">
            <div className="cloud"></div>
            <div className="sun">
                <div className="rays"></div>
            </div>
            <div className="rain"></div>
        </div>
    );
};

const ThunderStorm = () => {
    return (
        <div className="icon thunder-storm">
            <div className="cloud"></div>
            <div className="lightning">
                <div className="bolt"></div>
                <div className="bolt"></div>
            </div>
        </div>
    );
};

const Cloudy = () => {
    return (
        <div className="icon cloudy">
            <div className="cloud"></div>
            <div className="cloud"></div>
        </div>
    );
};

const Snow = () => {
    return (
        <div className="icon flurries">
            <div className="cloud"></div>
            <div className="snow">
                <div className="flake"></div>
                <div className="flake"></div>
            </div>
        </div>
    );
};

const Sunny = () => {
    return (
        <div className="icon sunny">
            <div className="sun">
                <div className="rays"></div>
            </div>
        </div>
    );
};

const Moon = () => {
    return (
        <div className="icon">
            <div className="moon">
                <div className="stars stars1">*</div>
                <div className="stars stars2">*</div>
                <div className="shooting-star"></div>
            </div>
        </div>
    );
};

const Rainy = () => {
    return (
        <div className="icon rainy">
            <div className="cloud"></div>
            <div className="rain"></div>
        </div>
    );
};

export default WeatherIcons;
