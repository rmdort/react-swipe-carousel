import React from 'react'
import PropTypes from 'prop-types'
import { smoothScroll, debounce, isFocusable } from './utils'
import cx from 'classnames'

const LEFT_KEY = 37
const RIGHT_KEY = 39

/**
 * Swipeable carousel
 */
export default class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: props.startIndex,
      canScrollLeft: false,
      canScrollRight: true
    }
    this._updateScrollState = debounce(this.updateScrollState, 100)
  }
  registerRef = el => {
    this.scroller = el
  }
  registerRowRef = el => {
    this.scrollRow = el
  }
  componentWillUnmount () {
    this.scroller &&
      this.scroller.removeEventListener('scroll', this._updateScrollState)
  }
  componentDidMount () {
    if (this.props.showNavigation) {
      /* Add keydown */
      this.scroller.addEventListener('scroll', this._updateScrollState)
      /* immediately update scroll state */
      this.updateScrollState()
      /* Add focus */
      if (this.props.autoFocus) this.scroller.focus()
    }
    const { active } = this.state
    if (active) {
      this.setState(
        {
          active
        },
        () => {
          /* Immediately jump to the selected slide */
          this.scrollTo(0)
        }
      )
    }
  }
  static defaultProps = {
    itemWidth: 'auto',
    showNavigation: true,
    startIndex: null,
    autoFocus: false,
  }
  static propTypes = {
    /**
     * Width of the carousel item
     */
    itemWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Show left right navigation buttons
     */
    showNavigation: PropTypes.bool,
    /**
     * Index of the initially active items in the carousel
     */
    startIndex: PropTypes.number,
    /**
     * Auto focus the carousel to enable keyboard navigation
     */
    autoFocus: PropTypes.bool
  }
  scrollTo = duration => {
    const { active } = this.state
    if (!this.scrollRow.children[active]) return
    const width = this.scrollRow.children[active].clientWidth
    smoothScroll(this.scroller, active * width, duration).then(
      this.updateScrollState
    )
  }
  updateScrollState = () => {
    if (!this.props.showNavigation || !this.scroller) return
    // console.log(this.scroller.scrollLeft, this.scroller.clientWidth, this.scroller.scrollWidth)
    /* Check if it can scroll left */
    this.setState({
      canScrollLeft: this.scroller.scrollLeft > 0,
      canScrollRight:
        this.scroller.scrollLeft + this.scroller.clientWidth <
        this.scroller.scrollWidth
    })
  }
  handlePrev = () => {
    if (!this.state.canScrollLeft) return
    this.setState(
      {
        active: Math.max(0, this.state.active - 1)
      },
      this.scrollTo
    )
  }
  handleNext = () => {
    if (!this.state.canScrollRight) return
    this.setState(
      {
        active: Math.min(this.props.children.length - 1, this.state.active + 1)
      },
      this.scrollTo
    )
  }
  handleKeyDown = event => {
    if (event.keyCode === RIGHT_KEY) {
      this.handleNext()
      event.preventDefault()
    }
    if (event.keyCode === LEFT_KEY) {
      this.handlePrev()
      event.preventDefault()
    }
  }
  render () {
    const {
      children,
      itemWidth,
      showNavigation,
      className
    } = this.props
    const { canScrollLeft, canScrollRight } = this.state
    const classes = cx('ola-swipeable', className)
    return (
      <div className={classes}>
        {showNavigation ? (
          <button
            className='ola-swipeable-prev'
            type='button'
            disabled={!canScrollLeft}
            onClick={this.handlePrev}
          >
            Left
          </button>
        ) : null}
        <div
          className='ola-swipeable-flow'
          tabIndex='-1'
          onKeyDown={this.handleKeyDown}
          ref={this.registerRef}
        >
          <div className='ola-swipeable-row' ref={this.registerRowRef}>
            {children.map((child, idx) => {
              return (
                <div className='ola-swipeable-item' key={idx}>
                  <div
                    className='ola-swipeable-item-inner'
                    style={{ width: itemWidth }}
                  >
                    {child}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {showNavigation ? (
          <button
            className='ola-swipeable-next'
            type='button'
            disabled={!canScrollRight}
            onClick={this.handleNext}
          >
            Right
          </button>
        ) : null}
      </div>
    )
  }
}
