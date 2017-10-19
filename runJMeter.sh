#/usr/bin/bash
if [[ $DOCKER_TLS_VERIFY ]]; then
    /apache-jmeter-3.3/bin/jmeter \
    -Dhost=${HOST} \
    -DdockerHost=${DOCKER_HOST} \
    -Dcert=${DOCKER_CERT_PATH} \
    -Dscript=/DayInTheLifeOfTriton/gen_key.sh \
    -Dkeyfile=${PRIVATE_KEY} \
    -Daccount=${SDC_ACCOUNT} \
    -Dusername=${SDC_USERNAME} \
    -DdockerPath=`which docker` \
    -Dduration=${DURATION} \
    -DThreads=${THREADS} \
    -Dtls=false \
    -n \
    -t ${TEST_NAME} \
    -o ${OUTPUT_DIRECTORY};
else
    /apache-jmeter-3.3/bin/jmeter \
    -Dhost=${HOST} \
    -DdockerHost=${DOCKER_HOST} \
    -Dcert=${DOCKER_CERT_PATH} \
    -Dscript=/DayInTheLifeOfTriton/gen_key.sh \
    -Dkeyfile=${PRIVATE_KEY} \
    -Daccount=${SDC_ACCOUNT} \
    -Dusername=${SDC_USERNAME} \
    -DdockerPath=`which docker` \
    -Dduration=${DURATION} \
    -DThreads=${THREADS} \
    -Dtls=true \
    -n \
    -t ${TEST_NAME} \
    -o ${OUTPUT_DIRECTORY};
fi
