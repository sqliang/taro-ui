import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import _chunk from 'lodash/chunk'
import PropTypes from 'prop-types'
import _isFunction from 'lodash/isFunction'

import AtIcon from '../icon/index'

import './index.scss'

export default class AtGrid extends Component {
  handleClick = (e, ...arg) => {
    const { onClick, columnNum } = this.props
    const { item, index, row } = e.currentTarget.dataset
    if (_isFunction(onClick)) {
      /* prettier-ignore */
      const clickIndex = (row * columnNum) + index
      onClick(item, clickIndex, e, ...arg)
    }
  }

  render () {
    const { data, mode, columnNum } = this.props

    if (Array.isArray(data) && data.length === 0) {
      return null
    }

    const gridGroup = _chunk(data, columnNum)

    const rootClass = [
      'at-grid__flex-item',
      'at-grid-item',
      `at-grid-item--${mode}`
    ]

    return (
      <View className='at-grid'>
        {gridGroup.map((item, i) => (
          <View className='at-grid__flex' key={i}>
            {item.map((childItem, index) => (
              <View
                key={index}
                className={rootClass}
                data-item={childItem}
                data-index={index}
                data-row={i}
                onClick={this.handleClick}
              >
                <View className='at-grid-item__content'>
                  <View className='at-grid-item__content-inner'>
                    <View className='content-inner__icon'>
                      {childItem.image && (
                        <Image
                          className='content-inner__img'
                          src={childItem.image}
                          mode='scaleToFill'
                        />
                      )}
                      {childItem.icon &&
                        !childItem.image && (
                        <AtIcon
                          value={childItem.icon}
                          color={childItem.iconColor}
                          size={childItem.iconSize}
                        />
                      )}
                    </View>
                    <Text className='content-inner__text'>
                      {childItem.value}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    )
  }
}

AtGrid.defaultProps = {
  data: [],
  columnNum: 3,
  mode: 'square'
}

AtGrid.propTypes = {
  mode: PropTypes.string,
  onClick: PropTypes.func,
  columnNum: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      image: PropTypes.string,
      value: PropTypes.string,
      iconSize: PropTypes.number,
      iconColor: PropTypes.string
    })
  )
}
