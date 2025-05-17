package ch.datahackdays.baustelleninfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Component
public class EndpointPrinter implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private RequestMappingHandlerMapping handlerMapping;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
//        handlerMapping.getHandlerMethods().forEach((requestMappingInfo, handlerMethod) -> {
//            System.out.println(requestMappingInfo);
//        });
    }
}