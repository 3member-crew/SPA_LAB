import React, { Component } from "react";
import Select from "react-dropdown-select";

const defaultOptions = [
    {
        value: "chat",
        label: "Чат"
    },
    {
        value: "playlist",
        label: "Плейлист"
    },
    {
        value: "userlist",
        label: "Список пользователей"
    },
];

class Switcher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: defaultOptions,
            selectedLabel: defaultOptions[0].label
        };
    }

    componentDidMount() {
        const defaultValue = [defaultOptions[0]];
        this.selectRef.setState({ values: defaultValue });
        this.props.onChange(defaultValue); // Вызываем функцию onChange с начальным значением по умолчанию
    }

    onChange = (selectedOptions) => {
        if (selectedOptions.length > 0) {
            const selectedLabel = selectedOptions[0].label;
            this.setState({ selectedLabel });
            this.props.onChange(selectedOptions); // Вызываем функцию onChange с выбранными опциями
        }
    };

    render() {
        return (
            <Select
                options={this.state.options}
                onChange={this.onChange}
                ref={(ref) => (this.selectRef = ref)}
                className="switcher-container"
            />
        );
    }
}

export default Switcher;