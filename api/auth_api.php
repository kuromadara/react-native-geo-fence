 <?php
	$cn = mysqli_connect("localhost","root","");
	$database = mysqli_select_db($cn, "attendence");
	
	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);
	$user = $DecodedData["user"];
	$pass = $DecodedData["pass"];
	// $user = $_POST['user'];
	// $pass = $_POST['pass'];
	
	$query = "select * from employee where username = '$user' and password = '$pass' ";
	
	$count = mysqli_query($cn, $query);

	if(mysqli_num_rows($count) == 0) {
		$auth = 0; //user not found
	} else {
		$auth = 1; //login successfull
	}
	$response = json_encode($auth);
	echo $response;
?>