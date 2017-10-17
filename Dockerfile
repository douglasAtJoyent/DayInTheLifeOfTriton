FROM centos

RUN yum install -y openssl docker java-1.8.0-openjdk git
RUN curl -o jmeter.tgz http://www-eu.apache.org/dist//jmeter/binaries/apache-jmeter-3.3.tgz
RUN tar -zxvf jmeter.tgz
env JMETER_BIN /apache-jmeter-3.3/bin

ENV PATH $PATH:$JMETER_BIN

RUN git clone https://github.com/douglasAtJoyent/DayInTheLifeOfTriton

RUN ssh-keygen -t rsa -f ~/.ssh/sdc-docker-jmeter.id_rsa -b 2048 -N "" 
RUN curl -O https://raw.githubusercontent.com/joyent/sdc-docker/master/tools/sdc-docker-setup.sh
RUN chmod 777 sdc-docker-setup.sh 
ENV SSH_FILE=~/.ssh/sdc-docker-jmeter.id_rsa
ENV PATH=$PATH:/apache-jmeter-3.3/bin
ENTRYPOINT bash
