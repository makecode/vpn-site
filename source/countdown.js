import Cookie from 'js-cookie';

const KEY_COOKIE_COUNTDOWN_TIME = 'SAFE_COUNTDOWN';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const OFFSET = (24 * 60 * 60 * 1000) * 3;//three days

class Countdown {
  constructor(container) {
    this.counter = container;

    this.timer = null;// setInterval will saved here
    this.startTime = null;// time for start countdown

    // define DOM elements
    this.days = $(this.counter).find('.days');
    this.hours = $(this.counter).find('.hours');
    this.minutes = $(this.counter).find('.minutes');
    this.seconds = $(this.counter).find('.seconds');

    // let's start with check cookie
    this.checkCookie();
  };

  /**
   * add zero before value if this value < 10
   * "3" => "03"
   */
  prettifyValue(value) {
    return value < 10 ? `0${value}` : value;
  }

  /**
   * If we have time from cookie - setup timer immediately.
   * Else save current time in cookie and setup timer after that.
   */
  checkCookie() {
    const timeFromCookie = Cookie.get(KEY_COOKIE_COUNTDOWN_TIME);

    if (timeFromCookie) {
      this.startTime = parseInt(timeFromCookie);
    } else {
      this.startTime = new Date().getTime();
      Cookie.set(KEY_COOKIE_COUNTDOWN_TIME, this.startTime);
    }

    this.setupTimer();
  }

  setupTimer() {
    const timeWithOffset = this.startTime + OFFSET;
    const currentTime = new Date().getTime();
    this.distance = timeWithOffset - currentTime;

    this.runTimer();
  }

  runTimer() {
    this.timer = setInterval(() => {
      if (this.distance > 0) {
        const dayValue = Math.floor(this.distance / (DAY));
        const hoursValue = Math.floor((this.distance % DAY) / HOUR);
        const minutesValue = Math.floor((this.distance % HOUR) / MINUTE);
        const secondsValue = Math.floor((this.distance % MINUTE) / SECOND);

        this.days.text(this.prettifyValue(dayValue));
        this.hours.text(this.prettifyValue(hoursValue));
        this.minutes.text(this.prettifyValue(minutesValue));
        this.seconds.text(this.prettifyValue(secondsValue));

        // decrease distance by 1 sec
        this.distance = this.distance - SECOND;
      } else {
        clearInterval(this.timer);
        $(this.counter).fadeOut();
      }
    }, SECOND)
  }
}

export default Countdown;