import { StyleSheet, Platform } from 'react-native'
import colors from './colors'


const commonStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flex1: {
    flex: 1,
  },

  flex2: {
    flex: 2,
  },

  flex3: {
    flex: 3,
  },

  elevate2: {
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  elevate4: {
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  section: {
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 4,
      },
    }),
    backgroundColor: 'white',
    marginBottom: 15,
  },

  alignStart: {
    alignItems: 'flex-start',
  },

  alignCenter: {
    alignItems: 'center',
  },

  alignEnd: {
    alignItems: 'flex-end',
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  countryCodeContainer: {
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: colors.appColor,
    paddingHorizontal: 7,
    marginEnd: 10,
    alignSelf: 'stretch',
  },

  countryCodeTitle: {
    fontSize: 11,
    color: 'gray',
    marginTop: 5,
    marginBottom: 3,
  },

  countryCode: {
    fontSize: 15,
  },

  button: {
    height: 50,
    backgroundColor: colors.appColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },

  buttonText: {
    color: 'white',
  },

  faintTitle: {
    marginBottom: 5,
    marginStart: 10,
    color: 'gray',
    fontWeight: 'bold',
  },

  highlightedText: {
    fontWeight: 'bold',
    color: colors.appColor,
    fontSize: 15,
  },

  highlightedLink: {
    color: colors.appColor,
    fontSize: 15,
    textDecorationLine: 'underline',
  },

  extraHighlightedLink: {
    fontWeight: 'bold',
    color: colors.appColor,
    fontSize: 15,
    textDecorationLine: 'underline',
  },

  lineThrough: {
    textDecorationLine: 'line-through',
  },

  seperatorHGray: {
    height: 1,
    backgroundColor: colors.seperatorGray,
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },

  seperatorHGray10: {
    height: 1,
    backgroundColor: colors.seperatorGray,
    alignSelf: 'stretch',
    marginVertical: 10,
  },

  seperatorVGray: {
    width: 1,
    backgroundColor: colors.seperatorGray,
    alignSelf: 'stretch',
  },

  marginLeft10: {
    marginLeft: 10,
  },

  padding10: {
    padding: 10,
  },

  padding15: {
    padding: 15,
  },

  paddingHorizontal10: {
    paddingHorizontal: 10,
  },

  paddingHorizontal15: {
    paddingHorizontal: 15,
  },

  price: {
    color: 'gray',
    fontWeight: 'bold',
  },

  excludedPrice: {
    color: 'gray',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },

  roundIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  stretchSelf: {
    alignSelf: 'stretch',
  }
})

export default commonStyles
