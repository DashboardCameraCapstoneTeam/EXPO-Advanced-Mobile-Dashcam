import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useEffect, useState, useRef } from 'react'; import AsyncStorage from '@react-native-async-storage/async-storage'
import { Camera, CameraType } from 'expo-camera';
import { Video } from 'expo-av';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { ALBUM_NAME } from '../../constants';
import { gpsJsonToGeojson } from '../../utils/geojson-utils';
import { Button, Text, Snackbar, SegmentedButtons, Divider } from 'react-native-paper';


const CameraScreen = () => {
  let cameraRef = useRef();

  const [snackBarVisible, setSnackBarVisible] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [hasLocationPermission, setHasLocationPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [locations, setLocations] = useState([]);


  const [selectedResolution, setSelectedResolution] = useState('480p');
  const [selectedCameraType, setSelectedCameraType] = useState('Back');
  const [selectedZoom, setSelectedZoom] = useState('0');
  const [selectedRecordingLength, setSelectedRecordingLength] = useState('8');
  const [selectedMaxVideoFileSize, setSelectedMaxVideoFileSize] = useState('0');
  const [selectedAutomaticRecording, setSelectedAutomaticRecording] = useState('false');

  let recordVideo = async () => {

    if (!cameraRef) return;

    setSnackBarVisible(true);
    // Clear Locations and Video
    setLocations([]);
    setVideo(null);

    // Set Location subscription
    // Get location every second (1000 milliseconds)
    const tempLocations = [];
    let locSub = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.High,
      timeInterval: 100,
      distanceInterval: 0
    },
      (location) => {
        tempLocations.push(location);
      }
    );

    console.log(locSub)

    // Set the camera options
    let cameraOptions = {
      quality: selectedResolution,
      mute: false,
      exif: true,
    };

    setIsRecording(true);
    await cameraRef.current.recordAsync(cameraOptions).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
      locSub.remove();
      setLocations(tempLocations);
    }).catch((error) => {
      console.error(error);
    });
  };


  const setPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
    const locationPermission = await Location.requestForegroundPermissionsAsync();

    setHasCameraPermission(cameraPermission.status === "granted");
    setHasMicrophonePermission(microphonePermission.status === "granted");
    setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    setHasLocationPermission(locationPermission.status === "granted");


    const tempResolution = await AsyncStorage.getItem('CameraResolution')
    if (tempResolution !== null || tempResolution !== '') {
      setSelectedResolution(tempResolution);
    }
    else {
      setSelectedResolution('480p');
    }

    const tempCameraType = await AsyncStorage.getItem('CameraType')
    if (tempCameraType !== null || tempCameraType !== '') {
      setSelectedCameraType(tempCameraType);
    }
    else {
      setSelectedCameraType('Back');
    }

    const tempZoom = await AsyncStorage.getItem('CameraZoom')
    if (tempZoom !== null || tempZoom !== '') {
      setSelectedZoom(tempZoom);
    }
    else {
      setSelectedZoom('0');
    }

    const tempRecordingLength = await AsyncStorage.getItem('RecordingLength')
    if (tempRecordingLength !== null || tempRecordingLength !== '') {
      setSelectedRecordingLength(tempRecordingLength);
    }
    else {
      setSelectedRecordingLength('80')
    }

    const tempMaxVideoFileSize = await AsyncStorage.getItem('MaxVideoFileSize')
    if (tempMaxVideoFileSize !== null || tempMaxVideoFileSize !== '') {
      setSelectedMaxVideoFileSize(tempMaxVideoFileSize);
    }
    else {
      setSelectedMaxVideoFileSize('4294967296');
    }

    const tempAutomaticRecording = await AsyncStorage.getItem('AutomaticRecording')
    if (tempAutomaticRecording !== null || tempAutomaticRecording !== '') {
      setSelectedAutomaticRecording(tempAutomaticRecording);
    }
    else {
      setSelectedAutomaticRecording('false');
    }



    if (cameraPermission && cameraRef !== undefined) {
      console.log('Camera Granted');
      console.log(`Reso ${selectedResolution}`)
      console.log(`cam type ${selectedCameraType}`)
      console.log(`zoom ${selectedZoom}`)
      console.log(`record lnght ${selectedRecordingLength}`)
      console.log(`max size ${selectedMaxVideoFileSize}`)
      console.log(`auto record ${selectedAutomaticRecording}`)
    }
    else {
      console.log('Does not have Camera Granted');
    }

  }



  useEffect(() => {
    setPermissions();
    return () => {
      setHasCameraPermission(null);
      setHasMicrophonePermission(null);
      setHasMediaLibraryPermission(null);
      setHasLocationPermission(null);

      setIsRecording(false);
      setVideo(null);
      setLocations([]);

    };
  }, []);



  if (hasCameraPermission === undefined || hasMicrophonePermission === undefined || hasLocationPermission === undefined) {
    return <Text>Request permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>
  }


  let stopRecording = () => {

    cameraRef.current.stopRecording();
    setIsRecording(false);
  };


  if (video) {
    let shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });

    };

    const saveData = async () => {

      const expoAlbum = await MediaLibrary.getAlbumAsync(ALBUM_NAME)
      const video_asset = await MediaLibrary.createAssetAsync(video.uri);
      // const filename = FileSystem.documentDirectory + "coordinates.json";
      // await FileSystem.writeAsStringAsync(filename, JSON.stringify(locations), {
      //   encoding: FileSystem.EncodingType.UTF8
      // });
      // console.log(filename);
      // const result = await FileSystem.readAsStringAsync(filename, {
      //   encoding: FileSystem.EncodingType.UTF8
      // });
      //console.log(result); 
      video_asset['exif'] = gpsJsonToGeojson(locations);
      console.log(video_asset);

      if (expoAlbum) {
        await MediaLibrary.addAssetsToAlbumAsync(video_asset, expoAlbum.id).then((result) => {
          console.log(result)
        });
      } else {
        await MediaLibrary.createAlbumAsync(ALBUM_NAME, video_asset).then((result) => {
          console.log(result)
        });
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode='contain'
          isLooping
        />
        <Button style={styles.button} icon="share" mode="contained" onPress={shareVideo} > Share</Button>
        {hasMediaLibraryPermission ?
          <Button style={styles.button} icon="content-save" mode="contained" onPress={saveData} >Save </Button>
          : undefined}
        <Button style={styles.button} icon="camera" mode="outlined" onPress={() => setVideo(undefined)} >Discard </Button>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>

      <Camera style={styles.container} ref={cameraRef} onCameraReady={selectedAutomaticRecording === 'true' ? recordVideo : null} quality={selectedResolution} type={selectedCameraType === 'Back' ? CameraType.back : CameraType.front} >
        <View style={styles.buttonContainer}>
          <Text>Global: {selectedResolution}</Text>
          <Button style={styles.button} icon="camera" mode="contained" onPress={isRecording ? stopRecording : recordVideo} >{isRecording ? "Stop Recording" : "Record Video"} </Button>
        </View>
      </Camera>

      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        duration={3000}
        action={{
          label: 'Close',
        }}>
        Recording Started
      </Snackbar>
    </View>

  );
  //react native beatiful video recorder button
  // return(
  //   <View>
  // 		......
  // 	  <TouchableOpacity onPress={isRecording ? stopRecording : recordVideo}>
  // 	  	<Text>Start</Text>
  // 	  </TouchableOpacity>
  // 	  <VideoRecorder ref={cameraRef} />
  // 	</View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  video: {
    flex: 1,
    alignSelf: "stretch"
  }
});

export default CameraScreen;