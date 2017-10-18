#/usr/bin/bash

/apache-jmeter-3.3/bin/jmeter -Dhost=${HOST} -DdockerHost=${DOCKER_URL} -Dcert=${DOCKER_CERT_PATH} -Dscriptlocation=/DayInTheLifeOfTriton/gen_key.sh -Dkeyfile=${SSH_FILE} -Daccount=${SDC_ACCOUNT} -Dusername=${SDC_USERNAME} -DdockerPath=`which docker` -Dduration=${DURATION} -DThreads=${THREADS} -Dtls=${TLS_FLAG} -n -t /DayInTheLifeOfTriton/JMeter/DayInTheLifeUnified.jmx -o ${OUTPUT_DIRECTORY} 
