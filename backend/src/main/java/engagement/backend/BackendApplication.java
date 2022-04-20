package engagement.backend;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.tomcat.jni.Time;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class BackendApplication {

	@GetMapping(value="/hello")
	public String test(){
		String pattern = "MM/dd/yyyy HH:mm:ss";
		DateFormat df = new SimpleDateFormat(pattern);
		Date today = Calendar.getInstance().getTime();        
		String todayAsString = df.format(today);
		return "Hello, the time is now " + todayAsString;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
