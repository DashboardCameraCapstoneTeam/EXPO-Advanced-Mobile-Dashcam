import { StyleSheet, Dimensions , StatusBar} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const main = '#142D5E';
const gray = '#F5F7FB';
const white = 'rgb(255, 255, 255)';
const dark = 'rgb(37, 37, 37)';
const black = 'rgb(0,0,0)';
const error = "#DF2935";
const success = "#679436";
const warning = "#FC9E4F";
const smoke = 'rgb(250, 250, 250)';
const navbarBlackTrans = 'rgba(0,0,0, 0.4)'
const navbarBlack = '#000000';
const small = 10;
const medium = 20;
const large = 30;
const border = 20;

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    noPadding: {
        padding: 0,
    },

    statusbarMargin: {
        marginTop: StatusBar.currentHeight
    },
    fontBold: {
        fontWeight: '100',
    },
    quarterFlex: {
        marginHorizontal: 1,
        width: windowWidth * 0.22,
    },
    thirdFlex: {
        marginHorizontal: 1,
        width: windowWidth * 0.32,
    },
    textGray: {
        color: gray,
    },
    textMain: {
        color: main,
    },
    textError: {
        color: error,
    },
    textSuccess: {
        color: success,
    },
    textWarning: {
        color: warning,
    },
    styleCard:{
        height: 50,
        width: 50,
        borderRadius: 50,
        
    },

    height100: {
        height: 90,
    },
    height50: {
        height: 50,
    },
    width50: {
        width: 50,
    },
    marginBsm: {
        marginBottom: small,
    },
    flex1: {
        flex: 1,
        padding: medium,
    },
    flex2: {
        flex: 2,
        padding: medium,
    },
    flex3: {
        flex: 3,
        padding: medium,
    },
    flex4: {
        flex: 4,
        padding: medium,
    },
    flex5: {
        flex: 5,
        padding: medium,
    },
    flex6: {
        flex: 6,
        padding: medium,
    },
    shadowLg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
    },
    roundedTop: {
        borderTopLeftRadius: border,
        borderTopRightRadius: border,
    },
    roundedBottom: {
        borderBottomLeftRadius: border,
        borderBottomRightRadius: border,
    },

    button: {
        padding: 1,
        borderRadius: border/2,
    },
    buttonLg: {
        padding: 5,
        marginBottom: 5,
    },
    borderRoundedHalf: {
        borderRadius: border/2,
    },

    borderRounded: {
        borderRadius: border,
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 2,
    },
    avatarContainer: {
        flex: 1,
        marginHorizontal: 2,
    },
    avatarImg: {
        flex: 1,
        justifyContent: 'center',
    },
    avatarText: {
        flex: 3,
        justifyContent: 'center',
    },

    marginXsm: {
        marginHorizontal: 10,
    },
    marginXmd: {
        marginHorizontal: 20,
    },
    marginXlg: {
        marginHorizontal: 30,
    },

    marginRsm: {
        marginRight: 10,
    },
    marginRmd: {
        marginRight: 20,
    },
    marginRlg: {
        marginRight: 30,
    },

    marginYsm: {
        marginVertical: 10,
    },
    marginYmd: {
        marginVertical: 20,
    },
    marginYlg: {
        marginVertical: 30,
    },
    divGray: {
        backgroundColor: gray,
    },
    divDark: {
        backgroundColor: dark,
    },
    divMain: {
        backgroundColor: main,
    },
    reactNativeShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.0,
        shadowRadius: 1,
        elevation: 10, // changed to a greater value
        borderColor: 'black',
        borderWidth: 1,
        zIndex: 99, // added zIndex
    },
    divSmoke: {
        backgroundColor: smoke,
    },
    divWhite: {
        backgroundColor: white,
    },
    divDanger: {
        backgroundColor: error,
    },
    divSpaceBetween: {
        justifyContent: 'space-between',
    },
    dividerWhite: {
        color: white,
        backgroundColor: white,
    },
    smallGreenDot: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        color: success,
    },
    smallRedDot: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        color: error,
    },

    rowContainerWrap: {
        flexWrap: 'wrap',
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: "auto",
    },
    buttonMain: {
        backgroundColor: main,
    },
    buttonDanger: {
        backgroundColor: error,
    },
    buttonDangerOutline: {
        color: error,
        borderColor: error,
        backgroundColor: white,
    },
    buttonSuccess: {
        backgroundColor: success,
    },
    buttonWarning: {
        backgroundColor: warning,
    },
    divCenter: {
        justifyContent: 'center',
    },
    paddingBsm: {
        paddingBottom: 10,
    },
    paddingXsm: {
        paddingHorizontal: 10,
    },
    paddingXmd: {
        paddingHorizontal: 20,
    },
    paddingYsm: {
        paddingVertical: 10,
    },
    paddingYmd: {
        paddingVertical: 20,
    },
    paddingYlg: {
        paddingVertical: 30,
    },
    whiteText: {
        color: 'white'
    },
    video: {
        alignSelf: "stretch",
        width: window.full,
        height: 300,
    },
    camera: {
        flex: 1,
        justifyContent: 'space-between',
    },
    alignCenter: {
        alignItems: 'center',
    },

    rowSpaceEven: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        display: 'flex',
        flexDirection: 'row',
    },
    card: {
        marginBottom: 0,
    },

    //* Map Styles
    mapContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    map: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    mapDetailsContainer: {
        padding: medium,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    divLine: {
        borderBottomColor: gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    divBlackTrans: {
        backgroundColor: navbarBlackTrans,
    },
    divBlack: {
        backgroundColor: navbarBlack,
    },
    //! Move these to map styles
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
});
export default GlobalStyles;