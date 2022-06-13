FROM registry.checkmk.com/enterprise/check-mk-enterprise:${CMK_VERSION}

RUN mkdir /mnt/backup
RUN chgrp omd /mnt/backup
RUN chmod g+w /mnt/backup

RUN apt-get --yes update
RUN apt-get --yes install vim