SRC_DIR = lib
TEST_DIR = test
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}/dist

RHINO ?= java -jar ${BUILD_DIR}/js.jar

CLOSURE_COMPILER = ${BUILD_DIR}/google-compiler-20100917.jar

MINJAR ?= java -jar ${CLOSURE_COMPILER}

BASE_FILES = ${SRC_DIR}/powerup.js\
	${SRC_DIR}/namespace.js\
	${SRC_DIR}/powerup/widget/dialog.js\

MODULES = ${BASE_FILES}

POWERUP = ${DIST_DIR}/powerup.js
POWERUP_MIN = ${DIST_DIR}/powerup.min.js

all: init powerup min lint
	@@echo "powerup build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

ifeq ($(strip $(V)),0)
verbose = --quiet
else ifeq ($(strip $(V)),1)
verbose =
else
verbose = --verbose
endif

powerup: ${POWERUP}
pu: ${POWERUP}

${POWERUP}: ${MODULES} ${DIST_DIR}
	@@echo "Building" ${POWERUP}

	@@cat ${MODULES} > ${POWERUP};

lint: ${POWERUP}
	@@echo "Checking powerup against JSLint..."
	@@${RHINO} build/jslint-check.js

min: ${POWERUP_MIN}

${POWERUP_MIN}: ${POWERUP}
	@@echo "Building" ${POWERUP_MIN}

	@@${MINJAR} --js ${POWERUP} --warning_level QUIET --js_output_file ${POWERUP_MIN}.tmp
	@@cat ${POWERUP_MIN}.tmp >> ${POWERUP_MIN}
	@@rm -f ${POWERUP_MIN}.tmp

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}

.PHONY: all powerup lint min init pu clean
