FROM ubuntu:18.04
ENTRYPOINT ["nodeos", "--data-dir", "/root/.local/share", "-e", "-p", "arisen", "--replay-blockchain", "--plugin", "arisen::producer_plugin", "--plugin", "arisen::chain_api_plugin", "--plugin", "arisen::http_plugin", "--http-server-address=0.0.0.0:8888", "--access-control-allow-origin=*", "--contracts-console", "--http-validate-host=false", "--verbose-http-errors", "--max-transaction-time=100"]

### base
RUN yes | unminimize \
 && apt-get update \
 && apt-get install -yq \
     binutils-gold \
     build-essential \
     clang-tools-8 \
     curl \
     g++-8 \
     git \
     libcurl4-gnutls-dev \
     libgflags-dev \
     libgmp3-dev \
     libssl-dev \
     libusb-1.0-0-dev \
     lld-8 \
     llvm-7 \
     llvm-7-dev \
     locales \
     ninja-build \
     pkg-config \
     python \
     software-properties-common \
     wget \
     xz-utils \
     zlib1g-dev \
 && update-alternatives --remove-all cc \
 && update-alternatives --install /usr/bin/cc cc /usr/bin/gcc-8 100 \
 && update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-8 100 \
 && update-alternatives --remove-all c++ \
 && update-alternatives --install /usr/bin/c++ c++ /usr/bin/g++-8 100 \
 && update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-8 100 \
 && update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-8 100 \
 && locale-gen en_US.UTF-8 \
 && curl -sL https://deb.nodesource.com/setup_10.x | bash -

ENV LANG=en_US.UTF-8

### cmake
WORKDIR /root
RUN curl -LO https://cmake.org/files/v3.13/cmake-3.13.2.tar.gz \
 && tar -xzf cmake-3.13.2.tar.gz \
 && cd cmake-3.13.2 \
 && ./bootstrap --prefix=/usr/local --parallel=8 \
 && make -j8 \
 && make install \
 && cd /root \
 && rm -rf cmake-3.13.2.tar.gz cmake-3.13.2

### boost
RUN curl -LO https://dl.bintray.com/boostorg/release/1.72.0/source/boost_1_72_0.tar.bz2 \
 && tar -xjf boost_1_72_0.tar.bz2 \
 && cd boost_1_72_0 \
 && ./bootstrap.sh --prefix=/usr/local \
 && ./b2 --with-iostreams --with-date_time --with-filesystem --with-system --with-program_options --with-chrono --with-test -j$(nproc) install \
 && cd /root \
 && rm -rf boost_1_72_0.tar.bz2 boost_1_72_0

### arisen.cdt
RUN git clone https://github.com/ARISENIO/arisen.cdt.git \
 && cd arisen.cdt \
 && git checkout arisen-cdt-2.1-staging-c \
 && git submodule update --init --recursive \
 && mkdir build \
 && cd build \
 && cmake -GNinja .. \
 && ninja -j8

### eos
RUN git clone https://github.com/ARISENIO/eos.git \
 && cd eos \
 && git checkout develop \
 && git submodule update --init --recursive \
 && mkdir build \
 && cd build \
 && CC=clang-8 CXX=clang++-8 cmake -GNinja -DCMAKE_BUILD_TYPE=Release -DCMAKE_AR=/usr/bin/llvm-ar-8 -DCMAKE_RANLIB=/usr/bin/llvm-ranlib-8 -DCMAKE_EXE_LINKER_FLAGS=-fuse-ld=lld .. \
 && CC=clang-8 CXX=clang++-8 ninja -j8

ENV PATH="/root/eos/build/bin/:/root/arisen.cdt/build/bin/:${PATH}"

RUN mkdir -p "/opt/arisen/bin/contracts"

COPY ./ /opt/arisen/bin

RUN mkdir -p "/opt/arisen/bin/config-dir"
RUN /bin/bash /opt/arisen/bin/scripts/deploy_contracts.sh
