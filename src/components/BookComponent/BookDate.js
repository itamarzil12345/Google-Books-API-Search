import React from "react";
import moment from "moment";
import { Calendar } from "react-widgets";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";

class BookDate extends React.Component {
  constructor(props) {
    super(props);

    Moment.locale("en");
    momentLocalizer();
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }
  handleChangeDate(date) {
    this.props.onChangeBookDatePicker(moment(date).format("YYYY-MM-DD"));
  }

  render() {
    return (
      <div>
        <Calendar
          defaultValue={this.props.formViewDate}
          value={
            this.props.formViewDate !== ""
              ? moment(
                  moment(this.props.formViewDate).format("YYYY-MM-DD") + " "
                ).toDate()
              : null
          }
          dateFormat={dt => String(dt.getDate())}
          onChange={this.handleChangeDate}
          footer={false}
        />
      </div>
    );
  }
}

export default BookDate;
